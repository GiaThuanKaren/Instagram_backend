// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbZGH1GtpnTRwJr5Vuso491m2rme8Og6c",
  authDomain: "instagram-giathuan.firebaseapp.com",
  projectId: "instagram-giathuan",
  storageBucket: "instagram-giathuan.appspot.com",
  messagingSenderId: "514260185942",
  appId: "1:514260185942:web:27879fc1b1d6532a845cf7"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db,app};
