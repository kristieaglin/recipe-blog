// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//connection to database
import {getFirestore} from 'firebase/firestore'

//connection to authentication
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWN470EJcIYFxrxrqp9VFOXk3h7lltlMQ",
  authDomain: "recipe-blog-15b81.firebaseapp.com",
  projectId: "recipe-blog-15b81",
  storageBucket: "recipe-blog-15b81.appspot.com",
  messagingSenderId: "879974805173",
  appId: "1:879974805173:web:5adc7ce5ad6e9640b798fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//setup and export database
export const db = getFirestore(app)

//setup and export auth
export const auth = getAuth(app)