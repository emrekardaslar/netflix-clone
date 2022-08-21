import movieTrailer from "movie-trailer";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "../../axios";
import MovieDetail from "../MovieDetail/MovieDetail";
import "./Row.css";
import { base_url } from "../../constants";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const findTrailer = async (movie) => {
    movieTrailer(movie.title || movie.name || movie.original_name)
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
        setSelectedMovie(movie);
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (movie) => {
    if (trailerUrl && movie === selectedMovie) {
      setTrailerUrl("");
    } else if (movie !== selectedMovie) {
      setSelectedMovie(movie);
      findTrailer(movie);
    } else {
      findTrailer(movie);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <img
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              key={movie.id}
              onClick={() => handleClick(movie)}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
      {trailerUrl && <MovieDetail movie={selectedMovie} trailerUrl={trailerUrl} />}
    </div>
  );
}

export default Row;
