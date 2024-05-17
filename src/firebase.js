import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD3mBuaxvToX76s1MnbjiUklgK6fCh5_w",
  authDomain: "placease-28906.firebaseapp.com",
  projectId: "placease-28906",
  storageBucket: "placease-28906.appspot.com",
  messagingSenderId: "178643141396",
  appId: "1:178643141396:web:45b4e6c76648202d47b801"
}

console.log(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;