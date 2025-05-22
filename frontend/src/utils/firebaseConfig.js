import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD0td8sF5KpY8Ce36GM4EdIKl8vtXPGNtA",
  authDomain: "ecommerce-app-e7c7c.firebaseapp.com",
  projectId: "ecommerce-app-e7c7c",
  storageBucket: "ecommerce-app-e7c7c.firebasestorage.app",
  messagingSenderId: "696457220103",
  appId: "1:696457220103:web:424d7d65f9b8286028daa2",
  measurementId: "G-LQ0G14Z8RW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
