import firebase from 'firebase/compat/app';
require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyBleABbd7_Rv6ROTTpdW9DKAZVCKsHhwek",
  authDomain: "soko-c02d5.firebaseapp.com",
  projectId: "soko-c02d5",
  storageBucket: "soko-c02d5.appspot.com",
  messagingSenderId: "1005103115365",
  appId: "1:1005103115365:web:0cad532e9cde5b5020aa8c",
  measurementId: "G-WL1E9PHKCY"
};

export default firebase.initializeApp(firebaseConfig);