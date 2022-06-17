import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyBMl3OWqIrBOZ07zmWm4syh8a2XGl0JmlQ",
  authDomain: "fullll-stackk.firebaseapp.com",
  databaseURL: "https://fullll-stackk-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fullll-stackk",
  storageBucket: "fullll-stackk.appspot.com",
  messagingSenderId: "729263629024",
  appId: "1:729263629024:web:d020c1cc3ebca1f9a06685"
};

const app = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(app);
export const firebaseAuth = getAuth(app)