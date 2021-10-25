import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9R8ipNyFmmUWZ8v39llkOppCplj1P-yA",
  authDomain: "project-tripljmp.firebaseapp.com",
  projectId: "project-tripljmp",
  storageBucket: "project-tripljmp.appspot.com",
  messagingSenderId: "1036301215831",
  appId: "1:1036301215831:web:5d8e6472af8bcd8598db12",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

export { storage, db };
