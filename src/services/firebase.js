import firebase from 'firebase/app'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAxPm1--21Ha1R2QvmwuDxxDrhZCBzqb1I",
    authDomain: "refarmed-group33.firebaseapp.com",
    databaseURL: "https://refarmed-group33.firebaseio.com",
    projectId: "refarmed-group33",
    storageBucket: "refarmed-group33.appspot.com",
    messagingSenderId: "282575705549",
    appId: "1:282575705549:web:b2d51f068bd2815a4b6084"
  };

  firebase.initializeApp(firebaseConfig)

  export default firebase;