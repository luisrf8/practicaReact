import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from './Utils/Firebase';
import 'firebase/compat/auth'
import Auth from './pages/Auth/Auth';
import Landing from './pages/Landing/Landing';
import LoggedLayout from './Components/Auth/Layouts/LoggedLayout';
import Topbar from './Components/Topbar/Topbar';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
    // firebase.auth().onAuthStateChanged(currentUser => {
    //   console.log(currentUser)
    //   if(!currentUser?.emailVerified) {
    //     firebase.auth().signOut()
    //     setUser(null);
    //   }
    //   else {
    //     setUser(currentUser);
    //   }
    //   setIsLoading(false);
    // });
    // if (isLoading) {
    //   return null;
    // }
  return (
    <>
      {!user ? <Auth /> : <LoggedLayout user={user}/>}
      <ToastContainer 
        position='top-center'
        autoClose = {5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl = {false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover = {false}
      />
    </>
  );
}


export default App;