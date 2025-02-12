// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { clientConfig } from '@/firebase.config';
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(clientConfig) : getApp();
export const db = getFirestore(app);