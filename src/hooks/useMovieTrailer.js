import React, { useEffect, useState } from 'react'
import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideos } from '../utils/movieSlice';

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideo = async () => {
      const data = await fetch("https://api.themoviedb.org/3/movie/"+movieId +"/videos?language=en-US", API_OPTIONS);
      const response = await data.json()
  
      console.log(response)
      
      const filterVideos = response.results.filter(video => video.type === "Trailer")
      const trailer = filterVideos.length ? filterVideos[0] : response.results[0]
      console.log(trailer)

      dispatch(addTrailerVideos(trailer))
    }

  useEffect(() => {
    !trailerVideo && getMovieVideo();
  }, []);
};

export default useMovieTrailer;