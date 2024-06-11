// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Import getDatabase function for Realtime Database


// Your web app's Firebase configuration
export const  firebaseConfig = {
  apiKey: "AIzaSyDu3ANCh8_2VKG9aL-LcdhqVAmnVbXhrM4",
  authDomain: "paniapp1.firebaseapp.com",
  projectId: "paniapp1",
  storageBucket: "paniapp1.appspot.com",
  messagingSenderId: "240786297771",
  appId: "1:240786297771:web:de032833141df590adb8ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore();
const database = getDatabase(app); // Initialize Realtime Database (RTDB)


export { auth, db , database};
