import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAnPOgJIYId83NiWHrYhTnj95schQHzvI",
  authDomain: "placement-portal-9c329.firebaseapp.com",
  projectId: "placement-portal-9c329",
  storageBucket: "placement-portal-9c329.appspot.com",
  messagingSenderId: "757298735047",
  appId: "1:757298735047:web:dbf34cb818c6f56732dbe2"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;