// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdub7zWoyUzw0N3AAxBrfMg-GvAC6k69E",
    authDomain: "bookstore-1efe1.firebaseapp.com",
    projectId: "bookstore-1efe1",
    storageBucket: "bookstore-1efe1.appspot.com",
    messagingSenderId: "369298325876",
    appId: "1:369298325876:web:79abac34f642fc2db3ec21"
};

export default firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storageFirebase = getStorage(app);