import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDDEtwY-6J6PQU3zcViAbNVySTZmSGxFkU",
    authDomain: "admass-login-register.firebaseapp.com",
    databaseURL: "https://admass-login-register-default-rtdb.firebaseio.com",
    projectId: "admass-login-register",
    storageBucket: "admass-login-register.appspot.com",
    messagingSenderId: "238520466208",
    appId: "1:238520466208:web:e0bf9846a2b50b00013545",
    measurementId: "G-WW9EESJ7XJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); 
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
  
  export { auth,db }; // Export the authentication instance