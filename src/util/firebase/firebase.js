// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxsaUrgPx6ZwGt6spu0t8n-zflQ6jE0s8",
  authDomain: "tixket-c4639.firebaseapp.com",
  projectId: "tixket-c4639",
  storageBucket: "tixket-c4639.appspot.com",
  messagingSenderId: "691224692371",
  appId: "1:691224692371:web:964f1365c3192236772f66",
  measurementId: "G-Y1W3EMZDPT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, analytics };
