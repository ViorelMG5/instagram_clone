// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuqJTWJU83WdIvcVLa28fY3f7VRcywoMg",
  authDomain: "instagram-clone-7d6dd.firebaseapp.com",
  databaseURL:
    "https://instagram-clone-7d6dd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "instagram-clone-7d6dd",
  storageBucket: "instagram-clone-7d6dd.appspot.com",
  messagingSenderId: "714504562355",
  appId: "1:714504562355:web:85ba61dc38fd8833cef2c6",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app);

export default app;
export { auth, db, storage };
