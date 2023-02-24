import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
/*import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import "firebase/compat/auth";*/



import 'firebase/storage'

const firebaseConfig = {
    apiKey : "AIzaSyAbW-1YIJVf74mHRjIfoOg6uwpUdu1Znq0" ,
    authDomain : "sergi-a2f0f.firebaseapp.com" ,
    projectId : "sergi-a2f0f" ,
    storageBucket : "sergi-a2f0f.appspot.com" ,
    messagingSenderId : "1064144175494" ,
    appId : "1:1064144175494:web:32faae4f1ca4bae00c6c07"
};



// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const firestoreRef = firebase.firestore()
const authRef = firebase.auth()
const storageRef = firebase.storage()

// timestamp
const tarih = firebase.firestore.FieldValue.serverTimestamp

export { firebase,firestoreRef, authRef,storageRef, tarih }