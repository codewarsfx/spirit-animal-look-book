import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBlwESnXY9DtRX5JbApFWokrCtHxcC2UKM",
    authDomain: "spirit-animal-lookbook-a73f8.firebaseapp.com",
    databaseURL: "https://spirit-animal-lookbook-a73f8-default-rtdb.firebaseio.com",
    projectId: "spirit-animal-lookbook-a73f8",
    storageBucket: "spirit-animal-lookbook-a73f8.appspot.com",
    messagingSenderId: "920000208429",
    appId: "1:920000208429:web:46745537df34992c34e2a4",
    measurementId: "G-VLLR8X3H26"
  };

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
