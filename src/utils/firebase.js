import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLRA75D0gTn6Ni1lLupfb33tcb_gKnOUw",
  authDomain: "studysync-36735.firebaseapp.com",
  projectId: "studysync-36735",
  storageBucket: "studysync-36735.firebasestorage.app",
  messagingSenderId: "978203056303",
  appId: "1:978203056303:web:ad0adeebc5dc17d4aa1c5a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();