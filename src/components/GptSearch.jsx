import React from "react";
import { BG_URL } from "../utils/constant";
import GptSearchBar from "./GPTSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestion";

function GptSearch() {
  return (
    <>
      <div className="fixed -z-10">
        <img className="w-full object-cover" src={BG_URL} alt="logo" />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
}

export default GptSearch;
