import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA58ywFm2Q4ik16l9JHJZ3fHrmzIVSVaBA",
    authDomain: "react-native-crud-64eb0.firebaseapp.com",
    projectId: "react-native-crud-64eb0",
    storageBucket: "react-native-crud-64eb0.appspot.com",
    messagingSenderId: "971421586361",
    appId: "1:971421586361:web:3827ff96957ba2666e1c68",
    measurementId: "G-GZ25D4Y25Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;