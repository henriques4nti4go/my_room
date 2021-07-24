import React,{useEffect, useState} from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Image, Alert } from 'react-native';
import {
    Text as TextPaper,
} from 'react-native-paper';

import {ID_CLIENT_GOOGLE} from "@env";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';
import firebase from '_config/firebase/firebase';
// import firebase from 'firebase';
import styles from '../../styles/style';
import ActivityIndicator from '_components/ActivityIndicator';
import {endpoints} from '_config/endpoints';
import {connect} from 'react-redux';
import {IHTTPResponse} from '_classes/interfaces/IHTTPResponse.interface';
// import {style as styles} from '_styles/';
import TextInput from '_components/TextInput';
import Button from '_components/Button';
import User from '../../utils/sqlite/models/User';


interface componentNameProps {
    navigation: any;
    setTokenAccess: Function;
    setUser: Function;
    setInfoProfileUser: Function;
    setAppTheme: Function;
}



function Index(props:componentNameProps) {
    const [isLoading,setIsLoading] = useState(false);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    React.useEffect(() => {
    
        const resetStates = props.navigation.addListener('blur', () => {
          setEmail('');
          setPassword('');
        });
    
        return resetStates;
      }, [props.navigation]);

    useEffect(() => {
        hasUserLoged();
    },[]);
    
    async function hasUserLoged() {
        setIsLoading(true)
        try {
            const user = new User();
            // await user.exec(`insert into users (email,password) values ('paulo@email.com','123')`)
            // console.log(await user.exec(`select * from users`))
            // return ;
            const user_saved:any = await user.exec(`select * from users`);
            const user_info = user_saved.rows._array;
            if (user_saved.rows._array.length) {
                requestAndAccess(user_info[0].email,user_info[0].password)
            }
            return;
        } catch (error) {
            
        }
        setIsLoading(false);
    }

    async function saveUser(email:string,password:string) {
        const user = new User();
        const hasUser:any = await user.exec(`SELECT * FROM users WHERE email='${email}'`);
        
        if (!hasUser.length)
            await user.exec(`INSERT INTO users(email,password) values ('${email}','${password}')`);
    }

    /**
     * @name getToken
     * @param token_id
     * @returns 
     * @description makes the request and returns the app's access token
     */
    async function getToken({email,password}:any):Promise<IHTTPResponse>{
        try {
            let {data} = await axios({
                method: 'POST',
                url: endpoints.token,
                data: {
                    email,
                    password
                }
            });
            return data.response;
        } catch (error:any) {
            return error.response.data 
        }
    }

    /**
     * @name signIn
     * @param token_id 
     * @returns 
     * @description returns user information
     */
    async function signIn(email:string,password:string):Promise<IHTTPResponse> {
        
        try {
            let response:any = await getToken({email,password});
            if (response.error) {
                if (String(response.descriptionError).toLocaleUpperCase() == 'Unregistered user'.toLocaleUpperCase()){
                    response.response = {message:'O usuario não está registrado!'};
                    
                    return response;
                }
            }
            
            let {data} = await axios({
                method: 'POST',
                url: endpoints.user.get_user,
                headers:{
                    'token': response.token_jwt,
                }
            });

            data.response['token_jwt'] = response.token_jwt;
            
            return data;
        } catch (error:any) {
            return error.response.data;
        }
    }

    function validationFields() {
        let response:IHTTPResponse = {
            code: 400,
            descriptionCode: 'error',
            error: true,
            response: {
                message:''
            }
        };
        // return console.log(email.length)
        if (email.length === 0){
            response.response.message = 'o campo email não pode ficar vazio!';
            throw response;
        };
        if (password.length === 0) {
            response.response.message = 'o campo de senha não pode ficar vazio!';
            throw response;
        }
    }

    async function requestAndAccess(email:string,password:string) {
        setIsLoading(true)
        const response_data_user = await signIn(email,password);
        
        if (!response_data_user.error) {
            let {
                user,
                user_id,
                name,
                user_name,
                bio
            } = response_data_user.response.profile;
            let url = response_data_user.response.profile_photo ? response_data_user.response.profile_photo.url : null;
            const {
                theme
            } = response_data_user.response.appTheme; 
            props.setTokenAccess(response_data_user.response.token_jwt);
            props.setUser({user});
            props
            props.setInfoProfileUser({
                email:user.email,
                name,
                user_name,
                profile_photo: url,
                bio
            });

            saveUser(email,password);
            props.setAppTheme(theme)
            props.navigation.navigate('Home');
        } else {
            setEmail('');
            setPassword('');
            Alert.alert('Erro!', response_data_user.response.message);
        }
        setIsLoading(false)
    }

    /**
     * @name access
     * @param token_id
     * @description main function that performs user authentication
     */
    async function access(email:string,password:string):Promise<void> {
        
        try {
            validationFields();
            requestAndAccess(email,password);
        } catch (error:any) {
            Alert.alert('Erro!',error.response.message);
        }
        
    }

    if (isLoading) return <ActivityIndicator />

    return (
        <View
        style={[
            styles.container,
            styles.align
        ]}
        >
            <View
            style={[
                styles.align,
                {
                    flex:1,
                    width: '80%',
                }
            ]}
            >
                <Image 
                style={{
                    width: 265,
                    height: 50,
                }}
                source={require('_assets/my_room.png')} />
            </View>
            
            <View
            style={{
                flex:1,
                width:'100%'
            }}
            >
                <View
                style={[
                    styles.mb1,
                ]}
                >
                    <TextInput
                    fontColor='black'
                    placeholderColor='#C4C4C4'
                    borderColor='#C4C4C4'
                    editable={!isLoading}
                    label='nome'
                    nameIcon='envelope'
                    placeholder='Digite seu nome de usuario'
                    // value={name}
                    onChangeText={(text) => setEmail(text) }
                    />
                </View>
                <View
                style={[
                    styles.mb1,
                ]}
                >
                    <TextInput
                    fontColor='black'
                    placeholderColor='#C4C4C4'
                    borderColor='#C4C4C4'
                    editable={!isLoading}
                    label='nome'
                    secureTextEntry={true}
                    placeholder='Digite a senha'
                    nameIcon='key'
                    // value={name}
                    onChangeText={(text) => setPassword(text) }
                    />
                </View>
                <View
                style={[
                    styles.mb1,
                    {flexDirection: 'row'}
                ]}
                >
                    <View style={{flex:1,marginRight:10}}>
                        <Button
                        loading={isLoading}
                        onPress={() => access(email,password) }
                        >
                            Entrar
                        </Button>
                    </View>
                    <View style={{flex:1}}>
                        <Button
                        loading={isLoading}
                        onPress={() => props.navigation.navigate('UserInformationRegistration') }
                        >
                            Registrar
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    );
}

const mapStateToProps = (state:any) => {
    return{
    }
};

const mapDispatchToProp = ( dispatch:any ) => {
    return{
        setTokenAccess: (value:string) =>{ dispatch({
            payload:{
                user_access_token:value
            },
            type:'USER_ACCESS_TOKEN'
        })},
        setUser: (value:any) => { dispatch({
            payload: value.user,
            type: 'USER'
        })},
        setInfoProfileUser: (value: object) => { dispatch({
            payload: value,
            type: 'SET_PROFILE_USER_INFORMATION',
        })},
        setAppTheme: (value: object) => { dispatch({
            payload: value,
            type: 'APP_THEME',
        })}
    }
}


export default connect(mapStateToProps,mapDispatchToProp)(Index);