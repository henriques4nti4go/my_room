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
    setUserId: Function;
    setInfoProfileUser: Function;
    setAppTheme: Function;
}


// class OperationsAuthUser{
//     private token:string;

//     constructor(token:string){
//         this.token = token;
//     }

//     /**
//      * authUser
//      */
//     public async authUser() {
//         let params = {
//             token_id: this.token
//         };
        
//         try {

//             let {data} = await axios({
//                 method: 'POST',
//                 headers:{
//                     'token':this.token
//                 },
//                 url: routes.logon.signIn,
//             }); 
//             return data;
//         } catch (error) {
//             // console.log(error.response.data);
//             return error.response.data;
           
//         }
        
//     }

// }


function Index(props:componentNameProps) {
    const [isLoading,setIsLoading] = useState(true);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: ID_CLIENT_GOOGLE,
        },
    );
    
    useEffect(() => {
        // firebase.auth().signOut()
        authUserWithGoogleFirebase(response);
    },[response]);

    useEffect(() => {
        verifyUser();
    },[]);

    async function getToken(token_id:string){
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
            error.response.data 
        }
    }

    async function signIn(token_id:string):Promise<IHTTPResponse> {
        try {
            let response = await getToken(token_id);
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

    async function verifyUser() {

        setIsLoading(true);
        const token_id:any = await verifyUserLogged();
        if (token_id) {
            // const auth:PatternResponse = await new OperationsAuthUser(token_id).authUser();
            const response_data_user = await signIn(token_id);
            
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
                props.setUserId({user_id});
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

    async function authUserWithGoogleFirebase(response:any) {
        setIsLoading(true)
        
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
            let resp = await firebase.auth().signInWithCredential(credential);
            
            await verifyUser();
        }
        setIsLoading(false);
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
                onPress={() => promptAsync()}
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
        setUserId: (value:object) => { dispatch({
            payload: value,
            type: 'USER_ID'
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