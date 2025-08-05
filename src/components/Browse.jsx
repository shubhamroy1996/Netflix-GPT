import React, { useEffect } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";

import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MovieContainer from "./MovieContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import GPTSearch from "./GPTSearch";

function Browse() {
  
  const showGptSearch = useSelector((store) => store.gptSearch.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();

  return (
    <>
      <div>
        <Header />
        {showGptSearch ? (
          <GPTSearch />
        ) : (
          <>
            <MovieContainer />
            <SecondaryContainer />
          </>
        )}
      </div>
    </>
  );
}

export default Browse;
