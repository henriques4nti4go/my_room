import firebase  from 'firebase';

class Firebase {
    private objFirebase = firebase;
    constructor(){
        this.createIfNotExists();
    }

    private createIfNotExists(){
        if (!firebase.apps.length) {
            firebase.initializeApp({
              apiKey: "AIzaSyCSDNVBXuC34eXU27RMP531a17mpuLGUmU",
              authDomain: "my-room-master.firebaseapp.com",
              projectId: "my-room-master",
              storageBucket: "my-room-master.appspot.com",
              messagingSenderId: "772665615535",
              appId: "1:772665615535:web:eaad760ef928dd9b5de05a",
              measurementId: "G-TNM3WYN7K9"
            });
        }
    }

    public getObjFirebase(){
        return this.objFirebase;
    }

}

const firebaseObject = new Firebase().getObjFirebase();

export default firebaseObject;
