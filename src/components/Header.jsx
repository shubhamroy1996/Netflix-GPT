import React, { useEffect } from "react";
import { LOGO, USER_AVATAR } from "../utils/constant";
import { auth } from "../utils/firebase";
import {  signOut } from "firebase/auth";
import {  onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user);

const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate('/browse')
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/')
      }
    });
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {user && (
        <div className="mr-3 flex">
        <img
            className="hidden md:block w-12 h-12"
            alt="usericon"
            src={USER_AVATAR}
          />
      <button onClick={handleSignOut} className="font-bold text-white ">
            (Sign Out)
          </button>
      </div>
      )}
      
      
    </div>
  );
}

export default Header;
