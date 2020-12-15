import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "ultimateplanner-3837b.firebaseapp.com",
  projectId: "ultimateplanner-3837b",
  storageBucket: "ultimateplanner-3837b.appspot.com",
  messagingSenderId: "357815102766",
  appId: "1:357815102766:web:a1417ee8af577232941ebf",
};

firebase.initializeApp(config);
firebase.firestore();
export default firebase;
