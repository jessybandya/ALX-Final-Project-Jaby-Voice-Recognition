import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCLFAQsjx1dEOtz_6JMqNek1jwCLaZq9c",
  authDomain: "alx-jaby.firebaseapp.com",
  projectId: "alx-jaby",
  storageBucket: "alx-jaby.appspot.com",
  messagingSenderId: "973902757120",
  appId: "1:973902757120:web:f3ee9f32b6662af26247e5",
  measurementId: "G-F0RYJN1H1T"
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