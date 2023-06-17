// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1cii3SOTrcq97pq5xuHvzOnJWnmeU-j8",
  authDomain: "steer-app-168c6.firebaseapp.com",
  projectId: "steer-app-168c6",
  storageBucket: "steer-app-168c6.appspot.com",
  messagingSenderId: "877852383262",
  appId: "1:877852383262:web:410fdd37a98396ec0c360f",
  measurementId: "G-3CJBB1DBZ8"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
// for additional services, like analytics and storage, initialise them here and use their exports in other files
// The alternative way of initialising them in their respective files threw a weird error
