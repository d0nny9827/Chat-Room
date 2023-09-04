import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2sY-rvg_VIMA3Jw0wRgKp9UWSFYQsyZY",
  authDomain: "fir-chat-app-f6049.firebaseapp.com",
  projectId: "fir-chat-app-f6049",
  storageBucket: "fir-chat-app-f6049.appspot.com",
  messagingSenderId: "66568256755",
  appId: "1:66568256755:web:517200b436d5cc37768b86",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
