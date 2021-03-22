import React,{useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
    Button, 
    Text as TextPaper,
    ActivityIndicator
} from 'react-native-paper';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { style,colors } from '_styles';
import axios from 'axios';
import firebase from '../../config/firebase';
import styles from '../../styles/style';


interface componentNameProps {
    navigation: any
}

WebBrowser.maybeCompleteAuthSession();


function verifyUserLogged():any {
    return firebase.auth().currentUser;
}

function authUserWithGoogleFirebase(response:any):void {
    if (response?.type === 'success') {
        const { id_token } = response.params;
        
        const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
        firebase.auth().signInWithCredential(credential);

    }
}



function Index(props:componentNameProps) {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: '129755680255-hjdnus0rotmndb3vng9tce2piq7ghob7.apps.googleusercontent.com',
        },
    );

    useEffect(() => {
        authUserWithGoogleFirebase(response);
    },[response]);

    useEffect(() => {
        let verify = verifyUserLogged();
        console.log(verify)
    },[]);

    // function goToHomeWithLogged(object:any) {
    //     if (object) {
    //         props.navigation.navigate('Home');
    //     }
    // }

    return (
        <View
        style={[
            styles.container,
            styles.align
        ]}
        >
            <View>
                <Button
                style={{backgroundColor:colors.PRIMARY}}
                mode='contained'
                onPress={() => promptAsync()}
                >
                    Acessar
                </Button>
            </View>
        </View>
    );
}

export default Index;