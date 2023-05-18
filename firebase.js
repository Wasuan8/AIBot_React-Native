import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcr3Hbao32AUcqNPPZCAjcxQQGZePC3Bg",
  authDomain: "aibot-1b743.firebaseapp.com",
  projectId: "aibot-1b743",
  storageBucket: "aibot-1b743.appspot.com",
  messagingSenderId: "358919464713",
  appId: "1:358919464713:web:fc6fa7624f2313a74d15d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};

