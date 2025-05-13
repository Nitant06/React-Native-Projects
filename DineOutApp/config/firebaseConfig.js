// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth"; // Import necessary functions
import { getFirestore } from "firebase/firestore";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBv1m2GzdmLy0pdwQNVSpatvHQosRhALAQ",
    authDomain: "dineoutapp-df74d.firebaseapp.com",
    projectId: "dineoutapp-df74d",
    storageBucket: "dineoutapp-df74d.firebasestorage.app",
    messagingSenderId: "238902964719",
    appId: "1:238902964719:web:b0fa46a4f7bf501576c61a",
    measurementId: "G-2CYY7WHL79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth, db };

