import * as React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import Container from '_components/Container';
import {style} from '_styles/';
import {connect} from 'react-redux';
import TextInput from '_components/TextInput'
import Button from '_components/Button';
import axios from 'axios';
import { endpoints } from '_config/endpoints';
import HeaderRoom from './HeaderRoom';
interface IProps {
  colors_theme:any;
  user_access_token:string;
  user_id:number;
  navigation:any;
}

const Index = (props: IProps) => {
  const [loading,setIsLoading] = React.useState(false);
  const [descriptionRoom,setDescriptionRoom] = React.useState('');
  const [nameRoom,setNameRoom] = React.useState('');
  
  /**
   * 
   * @param inputField
   * @param nameField
   * @description checks if a field is empty and returns an alert 
   */
  function validationField(inputField:string,nameField:string):void {
    if(!(/^\s+$/.test(inputField)) && inputField.length > 0) return;
    Alert.alert('Erro!',`o campo ${nameField} não pode permanecer vazio`);
    throw 'ocorreu um erro!';
  }

  /**
   * @name createRoom
   * @param
   * @description request for create a room
   */
  async function createRoom():Promise<void> {
    setIsLoading(true);
    
    try {
      validationField(nameRoom,'Nome da sala');

      const {data} = await axios({
        method:'POST',
        url: endpoints.room.create,
        headers: {
          token:props.user_access_token,
        },
        data: {
          user_id: props.user_id,
          title: nameRoom,
          description: descriptionRoom
        }
      })
      if (!data.error) props.navigation.navigate('Home');
    } catch (error:any) {
      Alert.alert('Erro!','Ocorreu um erro ao tentar criar a sala');
    }
    setIsLoading(false);
  }

  return (
    <Container
    navigation={props.navigation}
    header={<Text></Text>}
    >
      <View style={[style.card,{backgroundColor:props.colors_theme.SECONDARY,marginBottom:10}]}>
        <View>
          <Text style={[style.fontSize,{fontWeight:'bold',color: props.colors_theme.FONT_COLOR}]}>Criar Sala</Text>
        </View>
      </View>
      <View style={[style.card,{backgroundColor:props.colors_theme.SECONDARY,marginBottom:10}]}>
        <View style={{marginBottom:10}}>
          <View>
            <Text style={{color:props.colors_theme.FONT_COLOR,fontWeight:"bold"}}>Nome da sala:</Text>
          </View>
          <View>
            <TextInput nameIcon='door-open' onChangeText={(text:string) => setNameRoom(text) } typeIcon='font-awesome-5' />
          </View>
        </View>
        <View style={{marginBottom:10}}>
          <View>
            <Text style={{color:props.colors_theme.FONT_COLOR,fontWeight:"bold"}}>Descrição:</Text>
          </View>
          <View>
            <TextInput nameIcon='book' onChangeText={(text:string) => setDescriptionRoom(text) } typeIcon='font-awesome-5' />
          </View>
        </View>
        <View style={{marginBottom:10}}>
          <View>
            <Button onPress={() => createRoom()}>Criar</Button>
          </View>
        </View>
      </View>
    </Container>
  );
};

const mapState = (state:any) => ({
  user_access_token: state.user.user_access_token,
  profile_user: state.profile_user,
  user_id: state.user.user_id,
  colors_theme: state.device.colors_theme
})

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
}

export default connect(mapState,mapDispatch)(Index);