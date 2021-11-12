import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  UserInfo,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import "firebase/storage";
import "firebase/database";

const {
  VITE_FIREBASE_APIKEY,
  VITE_FIREBASE_AUTHDOMAIN,
  VITE_FIREBASE_PROJECTID,
  VITE_FIREBASE_STORAGEBUCKET,
  VITE_FIREBASE_MESSAGINGSENDERID,
  VITE_FIREBASE_APPID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FIREBASE_APIKEY,
  authDomain: VITE_FIREBASE_AUTHDOMAIN,
  projectId: VITE_FIREBASE_PROJECTID,
  storageBucket: VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGINGSENDERID,
  appId: VITE_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const provider = new GoogleAuthProvider();

export interface UserInformation extends UserInfo {}

export { db, auth, provider, signInWithPopup };

export default db;
