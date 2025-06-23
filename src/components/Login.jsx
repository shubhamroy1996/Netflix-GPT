import { useState, useRef } from "react";
import { BG_URL } from "../utils/constant";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

function Login() {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef();
  const password = useRef();

  function handleButtonClick() {
    const validationResponse = checkValidData(
      email.current.value,
      password.current.value
    );
    console.log(validationResponse);
    setErrorMessage(validationResponse);
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
