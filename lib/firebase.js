import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0GLENIXYI8iRvDHT30tMA0I6BemHxwNQ",
  authDomain: "stock-management-6a0fe.firebaseapp.com",
  projectId: "stock-management-6a0fe",
  storageBucket: "stock-management-6a0fe.firebasestorage.app",
  messagingSenderId: "923213861700",
  appId: "1:923213861700:web:243329e5dfa31f3b2b3d11"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);