import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBvfVUNnYLDgGpn5ZJeWRhOIcvbq-IkB3U",
    authDomain: "final-year-project-72979.firebaseapp.com",
    projectId: "final-year-project-72979",
    storageBucket: "final-year-project-72979.appspot.com",
    messagingSenderId: "380508928272",
    appId: "1:380508928272:web:f977f116e59405ca0c8d95",
    measurementId: "G-R46DC2W3HS"
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);