import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvornZVCoN3qABimO4BkIVLU7vR-T1PIU",
  authDomain: "instagram-22990.firebaseapp.com",
  databaseURL:
    "https://instagram-22990-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "instagram-22990",
  storageBucket: "instagram-22990.appspot.com",
  messagingSenderId: "944114469528",
  appId: "1:944114469528:web:3c42213128ed71c1941eed",
  measurementId: "G-V78WLRCRRY",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
