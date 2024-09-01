// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj4iHiNdspMYSQJj-1Eu3r1GoKzqAasz4",
  authDomain: "chats-49bef.firebaseapp.com",
  projectId: "chats-49bef",
  storageBucket: "chats-49bef.appspot.com",
  messagingSenderId: "461303141117",
  appId: "1:461303141117:web:706de53b8ef10fdd102494",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// kimlik doğrulama hizmetinin referansını al
export const auth = getAuth(app);

// google sağlayıcısının kurulumu
export const provider = new GoogleAuthProvider();

//veri tabaninin referansini aliyoruz
export const db = getFirestore(app);
