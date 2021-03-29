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
                url: routes.logon.signIn,
                data: params
            });

            return data;

        } catch (error) {
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
                props.setTokenAccess(auth.response.token);
                props.navigation.navigate('Home')
            }

        }
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
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
            let resp = await firebase.auth().signInWithCredential(credential);
            await verifyUser();
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
                    flex:3
                }
            ]}
            >
                <TextPaper
                style={{
                    fontSize:50,
                    fontWeight: 'bold'
                }}
                >
                    MyRoom
                </TextPaper>
            </View>
            <View
            style={{
                flex:1
            }}
            >
                <TouchableOpacity
                onPress={() => promptAsync()}
                >
                    <Image style={{width:50,height:50}} source={require('_assets/google.png')} />
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
    }
}


export default connect(mapStateToProps,mapDispatchToProp)(Index);