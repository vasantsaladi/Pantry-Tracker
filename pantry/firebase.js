// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAf6XSuxKKzpE50QzGTJ7q2GHaINTt4",
  authDomain: "hspantryapp.firebaseapp.com",
  projectId: "hspantryapp",
  storageBucket: "hspantryapp.appspot.com",
  messagingSenderId: "1027045191105",
  appId: "1:1027045191105:web:c3251a6d9906d25845340",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };
