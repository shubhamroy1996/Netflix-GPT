import React, { useEffect } from "react";
import Header from "./Header";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MovieContainer from "./MovieContainer";


function Browse() {

  useNowPlayingMovies()

  return (
    <>
  <div className="w-full h-full">
    <h1><Header/></h1>
  </div>
  <div>
    <MovieContainer/>
  </div>
    </>
)}

export default Browse;
