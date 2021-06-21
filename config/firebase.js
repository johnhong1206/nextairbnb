import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB_dCAasLKsKjFMjhodv4YeYrhQiqhFvTE",
  authDomain: "nextfirebase-13ef4.firebaseapp.com",
  projectId: "nextfirebase-13ef4",
  storageBucket: "nextfirebase-13ef4.appspot.com",
  messagingSenderId: "589860425820",
  appId: "1:589860425820:web:ed457e66a7072385fe5699",
  measurementId: "G-GWRM21XNDB",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
