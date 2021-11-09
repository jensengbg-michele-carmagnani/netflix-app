import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAz2OP04ZUlsohLNaQzI93SO5qT1k2rfyk",
  authDomain: "netflix-clone-f5587.firebaseapp.com",
  projectId: "netflix-clone-f5587",
  storageBucket: "netflix-clone-f5587.appspot.com",
  messagingSenderId: "354898217265",
  appId: "1:354898217265:web:3adea6d6af89bcd5764810",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
export { auth };

export default db;
