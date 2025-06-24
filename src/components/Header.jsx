import React from "react";
import { LOGO, USER_AVATAR } from "../utils/constant";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate()
  const user = useSelector((store) => store.user);

const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

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
