import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCM0hOMResB5nrFyHK1JBuHp6QPEwrIPVQ",
  authDomain: "avaliation-system-react.firebaseapp.com",
  projectId: "avaliation-system-react",
  storageBucket: "avaliation-system-react.appspot.com",
  messagingSenderId: "773205591779",
  appId: "1:773205591779:web:b1c864721c42b9a09d27d6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
