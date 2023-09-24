// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAps9D2yy9WTlh2fEqjT_njbhBJHfQfLwA",
  authDomain: "fir-9d04b.firebaseapp.com",
  projectId: "fir-9d04b",
  storageBucket: "fir-9d04b.appspot.com",
  messagingSenderId: "415555769002",
  appId: "1:415555769002:web:d0132fef6565795f9d76d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
