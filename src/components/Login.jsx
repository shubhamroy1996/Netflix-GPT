import { useState, useRef } from "react";
import { BG_URL, USER_AVATAR } from "../utils/constant";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

function Login() {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null)
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate()

  function handleButtonClick() {
    const validationResponse = checkValidData(
      email.current.value,
      password.current.value
    );
    console.log(validationResponse);
    setErrorMessage(validationResponse);
    if(validationResponse) return

    //sign in and sign up logic
    if(!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user
          updateProfile(user, {
            displayName: name.current.value, photoURL: 'https://avatars.githubusercontent.com/u/37293998?s=400&u=1795ffe9c3a15417bbbe26cc2dac763ddcca1a44&v=4'
          })
          .then(()=> {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                 uid: uid, 
                 email: email, 
                 displayName: displayName,
                 photoURL: photoURL,
                 }));
            navigate('/browse')
            })
          })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          setErrorMessage(errorCode + "-" + errorMessage)
        })
    }
    else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate('/browse')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  }

  function toggleSignInForm() {
    setSignInForm(!isSignInForm);
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="w-full object-cover"
          src={BG_URL}
          alt="background-image"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="text-4xl font-bold py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full name"
            className="p-4 my-4 w-full bg-black bg-opacity-70"
          />
        )}

        <input
          className="p-4 my-4 w-full bg-black bg-opacity-70"
          ref={email}
          type="text"
          placeholder="Email or mobile number"
          autoComplete="email"
        />

        <input
          className="p-4 my-4 w-full bg-black bg-opacity-70"
          ref={password}
          type="password"
          placeholder="Password"
        />

        <p className="text-red-500 font-bold text-sm py-2">{errorMessage}</p>

        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
}

export default Login;
