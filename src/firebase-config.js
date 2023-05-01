// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYIPH5xE4oUkueUrh242IrnrxztGmxb7Y",
  authDomain: "chatapp-c2474.firebaseapp.com",
  projectId: "chatapp-c2474",
  storageBucket: "chatapp-c2474.appspot.com",
  messagingSenderId: "568878895499",
  appId: "1:568878895499:web:0958afab0ff4fa3bcbdf8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
