import React, { useEffect } from "react";
import { LOGO, USER_AVATAR } from "../utils/constant";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import {SUPPORTED_LANGUAGES} from '../utils/constant'
import { changeLanguage } from "../utils/configSlice";


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gptSearch.showGptSearch)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  function handleGptSearchClick() {
    dispatch(toggleGptSearchView());
  }

  function handleLanguageChange(e) {
    dispatch(changeLanguage(e.target.value))
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {user && (
        <div className="mr-3 flex">
          {showGptSearch && (
            <select 
            className="p-2 m-2 bg-gray-900 text-white"
            onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang)=> (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
          )}
          
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
          {showGptSearch ? 'Homepage' : 'Gpt Search'}
          </button>

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
