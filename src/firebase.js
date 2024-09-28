import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAWduItH7rrkbd5sekXnNxw1BnzgD4NtfA",
    authDomain: "data-eb970.firebaseapp.com",
    projectId: "data-eb970",
    storageBucket: "data-eb970.appspot.com",
    messagingSenderId: "877563731293",
    appId: "1:877563731293:web:d0615c0f0a955e6f935cb4",
    measurementId: "G-9B7CSQCZRQ"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);