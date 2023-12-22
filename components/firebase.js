import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
  onSnapshot
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCLFAQsjx1dEOtz_6JMqNek1jwCLaZq9c",
  authDomain: "alx-jaby.firebaseapp.com",
  projectId: "alx-jaby",
  storageBucket: "alx-jaby.appspot.com",
  messagingSenderId: "973902757120",
  appId: "1:973902757120:web:f3ee9f32b6662af26247e5",
  measurementId: "G-F0RYJN1H1T"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleAuthProvider = new GoogleAuthProvider();

export { auth, db, storage, onSnapshot, setDoc,doc, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, getFirestore, query, getDocs, collection, where, addDoc, googleAuthProvider }