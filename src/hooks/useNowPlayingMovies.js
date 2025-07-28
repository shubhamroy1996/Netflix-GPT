import { useDispatch } from "react-redux"
import { addNowPlayingMovies } from "../utils/movieSlice"
import { API_OPTIONS } from "../utils/constant"
import { useEffect } from "react"

const useNowPlayingMovies = () => {

  const dispatch = useDispatch()

  async function getNowPlayingMovies() {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)
    const response = await data.json()
    console.log(response?.results)
    dispatch(addNowPlayingMovies(response?.results))
  }

  useEffect(()=>{
    getNowPlayingMovies()
  },[])
}

export default useNowPlayingMovies