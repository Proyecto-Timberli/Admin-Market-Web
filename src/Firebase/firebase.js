// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD657dGVLZMcitkc98GRDpdlPp_yVIaSRc",
  authDomain: "bussines-admin-prueba.firebaseapp.com",
  projectId: "bussines-admin-prueba",
  storageBucket: "bussines-admin-prueba.appspot.com",
  messagingSenderId: "908644981012",
  appId: "1:908644981012:web:098f2c8689b808bda40a01"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()

