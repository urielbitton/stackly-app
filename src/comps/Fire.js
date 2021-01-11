import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCDF70YhkQKaaHrkUT4u6qfIbhePKfEeHo",
  authDomain: "stackly-2a177.firebaseapp.com",
  projectId: "stackly-2a177",
  storageBucket: "stackly-2a177.appspot.com",
  messagingSenderId: "423644792364",
  appId: "1:423644792364:web:baf023c31fb5f9554e3389"
});

const db = firebaseApp.firestore()
const Fire = firebaseApp

export { db, Fire } 
