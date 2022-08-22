import React, { useEffect, useState } from "react";
import axios from "../../axios";
import MovieDetail from "../MovieDetail/MovieDetail";
import "./Row.css";
import { base_url } from "../../constants";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (movie !== selectedMovie) {
      setSelectedMovie(movie)
    }
    else {
      setSelectedMovie("")
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
      {selectedMovie && <MovieDetail movie={selectedMovie}/> }
    </div>
  );
}

export default Row;
