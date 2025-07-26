import { initializeApp } from "firebase/app";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoSug9pxn2SLPJzUp8nVS5cpbvooi4okU",
  authDomain: "chat-app-8f8d9.firebaseapp.com",
  projectId: "chat-app-8f8d9",
  storageBucket: "chat-app-8f8d9.firebasestorage.app",
  messagingSenderId: "813837902121",
  appId: "1:813837902121:web:8dea1bd1c61eda4fc4d738",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistance: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
