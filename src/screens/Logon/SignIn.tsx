import React,{useEffect, useState} from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Image } from 'react-native';
import {
    Button, 
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

WebBrowser.maybeCompleteAuthSession();


interface componentNameProps {
    navigation: any;
    setTokenAccess: Function;
    setUser: Function;
    setInfoProfileUser: Function;
    setAppTheme: Function;
}



function Index(props:componentNameProps) {
    const [isLoading,setIsLoading] = useState(true);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: ID_CLIENT_GOOGLE,
        },
    );

    const [reciveRequestGoogle,setReciveRequestGoogle] = useState(false);

    

    useEffect(() => {
        authUserWithGoogleFirebase(response);
    },[response]);

    useEffect(() => {
        runCheckAtStart();
    },[]);
    
    /**
     * @name getToken
     * @param token_id
     * @returns 
     * @description makes the request and returns the app's access token
     */
    async function getToken(token_id:string):Promise<IHTTPResponse>{
        try {
            let {data} = await axios({
                method: 'POST',
                url: endpoints.token,
                headers:{
                    'token_oauth': token_id,
                }
            });
            return data.response;
        } catch (error:any) {
            return error.response.data 
        }
    }

    /**
     * @name signUp
     * @param access_id 
     * @returns
     * @description get the refresh token and register a new user 
     */
    async function signUp(access_id:string):Promise<IHTTPResponse> {
        try {
            let {data} = await axios({
                method: 'POST',
                url: endpoints.user.signUp,
                headers:{
                    'access_id': access_id,
                }
            });

            return data;
        } catch (error:any) {
            return error.response.data;
        }
    }

    /**
     * @name signIn
     * @param token_id 
     * @returns 
     * @description returns user information
     */
    async function signIn(token_id:string):Promise<IHTTPResponse> {
        try {
            
            let response:any = await getToken(token_id);
            
            if (response.error) {
                if (String(response.descriptionError).toLocaleUpperCase() == 'Unregistered user'.toLocaleUpperCase()){
                    await signUp(token_id)
                }
            }
            
            response = await getToken(token_id);

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

    /**
     * @name verifyUserLogged
     * @returns string
     * @description check if the user has already connected from the device
     */
    async function verifyUserLogged():Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                firebase.auth().onAuthStateChanged(async (user) => {
                    const getIdToken:any = await user?.getIdToken();
                    resolve(getIdToken);
                });
            } catch (error) {
                reject(error);
            }
        })
    }

    /**
     * @description just a function to check if the user is already logged in by the device
     */
    async function runCheckAtStart(){
        let token = await verifyUserLogged();    
        verifyUser(token);
    }

    /**
     * @name verifyUser
     * @param token_id
     * @description main function that performs user authentication
     */
    async function verifyUser(token_id:string):Promise<void> {
       
        setIsLoading(true);    
        if (token_id) {
            // const auth:PatternResponse = await new OperationsAuthUser(token_id).authUser();
            const response_data_user = await signIn(token_id);
            console.log(response_data_user)
            if (!response_data_user.error) {
                let {
                    user,
                    user_id,
                    name,
                    user_name,
                    bio
                } = response_data_user.response.profile;
                let {
                    url,
                } = response_data_user.response.profile_photo;
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
                props.setAppTheme(theme)
                props.navigation.navigate('Home');
            }

        }
        setIsLoading(false);
    }


    async function authUserWithGoogleFirebase(response:any) {
        
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
            let res = await firebase.auth().signInWithCredential(credential)
            let token = await verifyUserLogged();
            await verifyUser(token);
            setReciveRequestGoogle(false)
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
                    flex:3,
                    width: '80%'
                }
            ]}
            >
                <Image 
                style={{
                    width: '100%',
                    height: '10%'
                }}
                source={require('_assets/my_room.png')} />
            </View>
            <View
            style={{
                flex:1
            }}
            >
                <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center',
                    shadowColor: "#000",
                }}
                onPress={() => {
                    if (response){
                        setIsLoading(true)
                       return authUserWithGoogleFirebase(response)
                    }
                    promptAsync()
                }}
                >
                    <Image style={{width:30,height:30,marginRight:10}} source={require('_assets/google.png')} />
                    <Text style={{fontWeight:'bold'}}>Continue com Google</Text>
                </TouchableOpacity>
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