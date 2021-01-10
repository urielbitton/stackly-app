import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAvrPk-GoWM5uovOBl4aYbT54kT0szm1F0",
  authDomain: "stackly-48325.firebaseapp.com",
  projectId: "stackly-48325",
  storageBucket: "stackly-48325.appspot.com",
  messagingSenderId: "202813432844",
  appId: "1:202813432844:web:ec9d37d88a204e4986ba29"
});

const db = firebaseApp.firestore()
const Fire = firebaseApp

export { db, Fire } 
