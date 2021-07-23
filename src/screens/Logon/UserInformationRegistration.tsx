import * as React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import {style} from '_styles/index';
import {
  Title,
} from 'react-native-paper';
import ActivityIndicator from '_components/ActivityIndicator';
import TextInput from '_components/TextInput';
import Button from '_components/Button';
import axios from 'axios';
import { endpoints } from '_config/endpoints';
import {IHTTPResponse} from '_classes/interfaces/IHTTPResponse.interface'
interface componentNameProps {
  navigation:any;
}


const componentName = (props: componentNameProps) => {
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [name,setName] = React.useState('');
  const [isLoading,setIsLoading] = React.useState(false);
  
  function validationFields() {
    let response:IHTTPResponse = {code:401,descriptionError:'empty fields',error: true,descriptionCode: 'error',response:{message:''}};
    if (name.length == 0) {
      response.response.data.message = 'o campo nome não pode ficar vazio!'
      throw response;
    }
    if (email.length == 0) {
      response.response.data.message = 'o campo email não pode ficar vazio!';
      throw response;
    }
    if (password.length == 0) {
      response.response.data.message = 'o campo de senha não pode ficar vazio!';
      throw response;
    }
  }
  
  async function signUp() {
    setIsLoading(true);
    try {
        validationFields();
        let {data} = await axios({
            method: 'POST',
            url: endpoints.user.signUp,
            data: {
              email,
              password,
              name,
            }
        });
        
        if (!data.error) {
          props.navigation.navigate('SignIn')
          Alert.alert('Sucesso!','Usuario criado com sucesso!')
        };
    } catch (error:any) {
      console.log(error.response.data.message)
      if (error.response.data.message)
      Alert.alert('Erro!',error.response.message);
      Alert.alert('Erro!','ocorreu um erro!')
    }
    setIsLoading(false);
  }

  if (isLoading) return <ActivityIndicator />

  return (
    <View style={[
      style.body,
      {
        alignItems: 'center'
      }
    ]}>
      <View
      style={[
        style.width,
      ]}
      >
        <Title>Registrar</Title>
      </View>
      <View
      style={[
        style.mb1,
        style.width,
      ]}
      >
        <TextInput 
        onChangeText={(text:string) => setName(text) }
        placeholder={'Nome'}
        nameIcon='user'
         />
      </View>
      <View
      style={[
        style.mb1,
        style.width,
      ]}
      >
        <TextInput 
        onChangeText={(text:string) => setEmail(text) }
        placeholder={'Email'}
        nameIcon='envelope'
         />
      </View>
      <View
      style={[
        style.mb1,
        style.width,
      ]}
      >
        <TextInput 
        secureTextEntry={true}
        onChangeText={(text:string) => setPassword(text) }
        placeholder={'Senha'}
        nameIcon='key'
         />
      </View>

      <View
      style={[
        style.mb1,
        style.width,
      ]}
      >
        <Button
        loading={false}
        onPress={() => signUp() }
        >
            Registrar
        </Button>
      </View>
    </View>
  )
};

export default componentName;

const styles = StyleSheet.create({
  container: {
    flex:1,justifyContent: 'center',alignItems: 'center'}
});
