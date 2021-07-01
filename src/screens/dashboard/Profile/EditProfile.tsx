import * as React  from 'react';
import { View, StyleSheet,Text, Alert} from 'react-native';
import {connect} from 'react-redux';
import ProfileImage from '_components/Profile/ProfileImage';
import ProfileInformation from '_components/Profile/ProfileInformation';
import ProfileEdit from '_components/Profile/ProfileEdit';
import style from '../../../styles/style';
import TextInput from '_components/TextInput';
import {
    Title,
    // TextInput,
    ActivityIndicator
} from 'react-native-paper';
import {
    Input,
    Icon
} from 'react-native-elements';
import axios from 'axios';
import {endpoints} from '_config/endpoints';
import { colors } from '_styles/index';
import { useIsFocused } from '@react-navigation/native';
import Button from '_components/Button';
import Container from '_components/Container';
import {style as styles} from '_styles/';
interface componentNameProps {
  profile_user: any;
  navigation: any;
  user_access_token:string;
  update_profile_user:Function;
  update_user_name:Function;
  user_id: string;
  colors_theme: any;
}

const Index = (props: componentNameProps) => {
    const isFocused = useIsFocused();
    const [loading,setLoading]              =   React.useState(false);
    const [name,setName]                    =   React.useState(props.profile_user.name);
    const [bio,setBio]                      =   React.useState(props.profile_user.bio);
    const [userName,setUserName]            =   React.useState(props.profile_user.user_name);
    
    React.useEffect(() => {
        
    },[isFocused])

    async function update_profile() {
        setLoading(true);
        try {
            let {data}:any = await axios({
                url: endpoints.user.edit_profile,
                method: 'post',
                data: {
                    name,
                    bio,
                },
                headers: {
                    'token': props.user_access_token
                }
            });

            if (!data.error) {
                props.update_profile_user({
                    name,
                    bio,
                });
                Alert.alert('Sucesso!','As informações foram atualizadas');
            }

        } catch (error) {
            Alert.alert('Erro!','Não foi possivel atualizar as informações');
        }
        setLoading(false);
    }

    async function updateUserName() {
        setLoading(true);
        try {
            let {data}:any = await axios({
                url: endpoints.user.update_user_name,
                method: 'post',
                data: {
                    user_name:userName
                },
                headers: {
                    'token': props.user_access_token
                }
            });
            console.log(data)
            if (!data.error) {
                props.update_user_name({
                    user_name:userName
                });
                Alert.alert('Sucesso!','O nome de usuario foi atualizado!');
            }
        } catch (error:any) {
            Alert.alert('Error!',error.response.data.descriptionError);
        }
        setLoading(false);
    }

    return (
        <Container>
            <View style={[{backgroundColor:props.colors_theme.SECONDARY,paddingVertical:10,paddingHorizontal:10,borderRadius:5,marginTop:20},styles.shadowBox]}>
                <Text style={{fontWeight:'bold',fontSize:25}}>Editar Perfil</Text>
            </View>
            <View style={[
                {backgroundColor:props.colors_theme.SECONDARY,paddingVertical:10,paddingHorizontal:10,borderRadius:5,marginTop:20},
                styles.shadowBox
            ]}>
                <View
                style={[
                    style.mb1
                ]}
                >
                    <TextInput
                    editable={!loading}
                    label='nome'
                    placeholder='Digite seu nome'
                    value={name}
                    onChangeText={(text) => setName(text) }
                    />
                </View>
                <View
                style={[
                    style.mb1
                ]}
                >
                    <TextInput
                    editable={!loading}
                    nameIcon='book'
                    placeholder='Digite sua bio'
                    value={bio}
                    multiline={true}
                    maxLength={150}
                    onChangeText={(text:string) => setBio(text) }
                    />
                </View>
                <View
                style={{
                    flexDirection:'row',
                    marginBottom:10
                }}
                >
                    <View style={{flex:1,marginRight:10}}>
                        <TextInput
                        editable={!loading}
                        nameIcon='user-tie'
                        placeholder='Digite seu nome de usuario'
                        value={userName}
                        multiline={true}
                        maxLength={150}
                        onChangeText={(text) => setUserName(text) }
                        />
                    </View>
                    <Button 
                    onPress={() => updateUserName()}
                    >Enviar</Button>
                </View>
                <View
                style={[
                    style.mb1
                ]}
                >
                    <Button
                    loading={loading}
                    onPress={() => update_profile()}>
                        {
                            !loading ? 'atualizar' : '' 
                        }
                    </Button>
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

const mapDispatchToProp = ( dispatch:any ) => {
    return{
        update_profile_user: (value: object) => { dispatch({
            payload: value,
            type: 'UPDATE_PROFILE_USER',
        })},
        update_user_name: (value: object) => { dispatch({
            payload: value,
            type: 'UPDATE_USER_NAME',
        })},
    }
}

export default connect(mapState,mapDispatchToProp)(Index);

