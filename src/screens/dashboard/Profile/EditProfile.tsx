import * as React  from 'react';
import { View, StyleSheet,Text} from 'react-native';
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

interface componentNameProps {
  profile_user: any;
  navigation: any;
  user_access_token:string;
  update_profile_user:Function;
  update_user_name:Function;
  user_id: string;
  colors_theme: string;
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
            }
        } catch (error) {
            // console.log(error)
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
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }

    return (
        <View style={[
        style.body,
        style.width,
        {
            alignSelf: 'center'
        }
        ]}>
            <Title>
                Editar Perfil
            </Title>
            <View
            style={[
                style.mb1
            ]}
            >
                <TextInput
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
                flexDirection:'row'
            }}
            >
                <View style={{flex:1}}>
                    <TextInput
                    nameIcon='user-tie'
                    placeholder='Digite seu nome de usuario'
                    value={userName}
                    multiline={true}
                    maxLength={150}
                    onChangeText={(text) => setUserName(text) }
                    />
                </View>
                <Button 
                onPress={() => console.log('loading')}
                loading={true}
                >Enviar</Button>
            </View>
            <View
            style={[
                style.mb1
            ]}
            >
            <Button
            loading={true}
            
            onPress={() => update_profile()}>
                {
                    !loading ? 'atualizar' : '' 
                }
            </Button>
            </View>
        </View>
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


const styles = StyleSheet.create({
  
});
