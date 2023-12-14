import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASdhGltluaUgN0P4F1DzcrjK2OwUFkKis",
  authDomain: "at-jaby-ai.firebaseapp.com",
  projectId: "at-jaby-ai",
  storageBucket: "at-jaby-ai.appspot.com",
  messagingSenderId: "640021085992",
  appId: "1:640021085992:web:b2deedd29f1fc580e89a1d",
  measurementId: "G-2FT9ZW81J4"
};
  
const firebaseSApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
 const db = firebaseSApp.firestore();
 const googleProvider = new firebase.auth.GoogleAuthProvider();
 const facebookProvider = new firebase.auth.FacebookAuthProvider();
 const GithubProvider = new firebase.auth.GithubAuthProvider();
 const storage = firebase.storage();
export default {auth, db, storage};
export  {db, googleProvider, facebookProvider,GithubProvider};
export  {auth};
export  {storage};