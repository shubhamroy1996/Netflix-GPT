import React, { useEffect } from "react";
import Header from "./Header";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MovieContainer from "./MovieContainer";


function Browse() {

  const dispatch = useDispatch()

  useNowPlayingMovies()

  return (
    <>
  <div>
    <Header/>
  
    <MovieContainer/>
  </div>
    </>
)}

export default Browse;
