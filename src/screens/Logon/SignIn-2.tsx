import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase';
import { Button } from 'react-native';

// Initialize Firebase
// if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCSDNVBXuC34eXU27RMP531a17mpuLGUmU",
    authDomain: "my-room-master.firebaseapp.com",
    projectId: "my-room-master",
    storageBucket: "my-room-master.appspot.com",
    messagingSenderId: "772665615535",
    appId: "1:772665615535:web:eaad760ef928dd9b5de05a",
    measurementId: "G-TNM3WYN7K9"
  });
// }

WebBrowser.maybeCompleteAuthSession();

export default function App() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '772665615535-81mdq3n6sug7tt1kdtn3n0s35cflcofd.apps.googleusercontent.com',
      },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      let firebase.auth().signInWithCredential(credential);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}