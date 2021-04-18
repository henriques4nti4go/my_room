import React,{useEffect, useState} from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Image } from 'react-native';
import {
    Button, 
    Text as TextPaper,
} from 'react-native-paper';

import {ID_CLIENT_GOOGLE} from "@env";

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { style,colors } from '_styles/index';
import axios from 'axios';
import firebase from '../../config/firebase';
import styles from '../../styles/style';
import ActivityIndicator from '_components/ActivityIndicator';
import {routes} from '_config/routes';
import PatternResponse from '_utils/PatternResponseApi';
import {connect} from 'react-redux';


WebBrowser.maybeCompleteAuthSession();

interface componentNameProps {
    navigation: any;
    setTokenAccess:Function;
    setUserId:Function,
    setInfoProfileUser:Function,
}


class OperationsAuthUser{
    private token:string;

    constructor(token:string){
        this.token = token;
    }

    /**
     * authUser
     */
    public async authUser() {
        let params = {
            token_id: this.token
        };
        
        try {

            let {data} = await axios({
                method: 'POST',
                headers:{
                    'token':this.token
                },
                url: routes.logon.signIn,
            }); 
            return data;
        } catch (error) {
            console.log(error.response.data);
            return error.response.data;
           
        }
        
    }

}


function Index(props:componentNameProps) {
    const [isLoading,setIsLoading] = useState(true);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: ID_CLIENT_GOOGLE,
        },
    );

    useEffect(() => {
        authUserWithGoogleFirebase(response);
    },[response]);

    useEffect(() => {
        verifyUser();
    },[]);

    async function verifyUser() {
        setIsLoading(true);
        const token_id = await verifyUserLogged();
        
        if (token_id) {
            const auth:PatternResponse = await new OperationsAuthUser(token_id).authUser();
            
            if (!auth.error) {
                let {
                    user,
                    user_id,
                    name,
                    user_name,
                } = auth.response.profile;
                let {
                    url,
                } = auth.response.profile_photo;
                props.setTokenAccess(auth.response.token_jwt);
                props.setUserId({user_id});
                props.setInfoProfileUser({
                    email:user.email,
                    name,
                    user_name,
                    profile_photo: url
                });
                props.navigation.navigate('Home');
            }

        }
        // props.navigation.navigate('Home');
        setIsLoading(false);
    }

    async function verifyUserLogged() {
        return new Promise((resolve, reject) => {
            try {
                firebase.auth().onAuthStateChanged(async (user) => {
                    const getIdToken = await user?.getIdToken();
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
      })}
    }
}


export default connect(mapStateToProps,mapDispatchToProp)(Index);