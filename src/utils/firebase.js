// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxVN198NBKZlahKLSS9TwC-1JfhKrZW3s",
  authDomain: "netflix-gpt-553d2.firebaseapp.com",
  projectId: "netflix-gpt-553d2",
  storageBucket: "netflix-gpt-553d2.firebasestorage.app",
  messagingSenderId: "766628479100",
  appId: "1:766628479100:web:7eb5741ea5375fe57509f9",
  measurementId: "G-L03WT480T5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()