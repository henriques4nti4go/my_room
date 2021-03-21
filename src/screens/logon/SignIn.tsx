import React,{useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
    Button, 
    Text as TextPaper,
    ActivityIndicator
} from 'react-native-paper';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { style } from '_styles';
import axios from 'axios';
import firebase from '_firebase';
import { colors } from '_styles';

WebBrowser.maybeCompleteAuthSession();

interface componentNameProps {
    navigation: any
}

const Index = (props: componentNameProps) => {

    let config = {
        /* This is the CLIENT_ID generated from a Firebase project */
        clientId: '129755680255-hjdnus0rotmndb3vng9tce2piq7ghob7.apps.googleusercontent.com',
    };

    const [isLoading,setIsLoading] = useState(true);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config);


    useEffect(() => {
        if (response?.type === 'success') {

            const { id_token } = response.params;
            // axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`).then((res) => {
            //     console.log(res.data)
            // });
            const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
            
            firebase.auth().signInWithCredential(credential);
        }
    },[response]);

    useEffect(() => {
        getUserSession();
    },[]);

    async function getUserSession() {
        setIsLoading(true);
        
            firebase.auth().onAuthStateChanged((user:any) => {
                console.log(user)
                if (user) props.navigation.navigate('Home');
                setIsLoading(false);
            });
    }

    if (isLoading) return <ActivityIndicator style={{alignSelf: 'center'}} animating={true} />;

    return (
        <View style={[style.body,style.container]}>
            <View
            style={[
                style.align,
                style.container,
            ]}
            >
                <TextPaper
                style={{
                    fontSize: 50,
                    fontWeight: 'bold',
                    color: colors.primary
                }}
                >
                    MyRoom
                </TextPaper>
            </View>
            <View
            style={[
                {
                    flex: 0.5,
                    alignItems:'center',
                }
            ]}
            >
                <Button
                mode='contained'
                style={[
                    style.button,
                    {
                        backgroundColor: colors.primary
                    }
                ]}
                onPress={ async () => {
                    await promptAsync();
                }}
                >
                    Acessar
                </Button>
                {/* <Button
                onPress={async() => {
                    await firebase.auth().signOut().then(() => {
                        console.log('ok')
                    })
                }}
                >
                    Sair
                </Button> */}
            </View>
        </View>
    );
};

export default Index;


