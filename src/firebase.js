
import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC0_lwONCqJjbEBSjvpAfUmMsqYn-4B9Sg",
    authDomain: "aben-instagram-clone.firebaseapp.com",
    databaseURL: "https://aben-instagram-clone.firebaseio.com",
    projectId: "aben-instagram-clone",
    storageBucket: "aben-instagram-clone.appspot.com",
    messagingSenderId: "440783721932",
    appId: "1:440783721932:web:5d82fe345dcf81105cf969",
    measurementId: "G-58N9HQ5JCH"
    
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export {db, auth, storage};