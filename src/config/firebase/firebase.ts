import firebase from 'firebase';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyDGqTSTi5FVyQXwV4veb7oSP9wJkt9uS5s",
        authDomain: "myroom-40298.firebaseapp.com",
        projectId: "myroom-40298",
        storageBucket: "myroom-40298.appspot.com",
        messagingSenderId: "129755680255",
        appId: "1:129755680255:web:7be3af25740968c605abca"
      });
}

export default firebase;