import React, { useEffect, useState } from 'react'
import './MovieDetail.css'
import { base_url } from '../../constants'
import YouTube from 'react-youtube'
import movieTrailer from "movie-trailer";

function MovieDetail({ movie }) {
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        // start new trailer every time movie changes
        setTrailerUrl("");
        if (movie) {
            findTrailer(movie);
        }
    }, [movie]);

    const findTrailer = async (movie) => {
        movieTrailer(movie.title || movie.name || movie.original_name)
        .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    };

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    }
  return (
    <div className="movie-detail">
        <img src={`${base_url}${movie.poster_path}`} alt={movie.title} className="movie-detail__poster" />
        <div className="movie-detail__data">
            <h1>{movie.name ? movie.name : movie.title}</h1>
            <h3>{Math.round(movie.vote_average * 10) / 10}</h3>
            <p>{movie.overview}</p>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
       
    </div>
  )
}

export default MovieDetail
