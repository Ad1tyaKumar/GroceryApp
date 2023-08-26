// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCVT9AH4m8qi6Hv-cI9UIc2C3Rg_TJVtcY",
  authDomain: "groceryapp-ce776.firebaseapp.com",
  projectId: "groceryapp-ce776",
  storageBucket: "groceryapp-ce776.appspot.com",
  messagingSenderId: "59170658501",
  appId: "1:59170658501:web:d4e0f237cd0294c26ff8ac",
  measurementId: "G-8SCEMPVRTT"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
