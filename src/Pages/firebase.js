import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCgQ--27WCV6zpmy1lHMfjv3UUKjnqyewg",
    authDomain: "e-commerce-4499f.firebaseapp.com",
    projectId: "e-commerce-4499f",
    storageBucket: "e-commerce-4499f.appspot.com",
    messagingSenderId: "318999637511",
    appId: "1:318999637511:web:3fcff6b1e27cf442e6c4a2",
    measurementId: "G-4C96GGWDH3"
  });
const db=firebaseApp.firestore();
const auth=firebaseApp.auth();
let authGetter=(callback)=>{
  auth.onAuthStateChanged(()=>{
  callback(true);})
}

export {db,auth,authGetter};