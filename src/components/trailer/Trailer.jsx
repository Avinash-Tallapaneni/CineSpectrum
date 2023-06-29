import React, { useState, useEffect } from "react";
import Carousel from "../carousel/Carousel";
import ReactPlayer from "react-player";

import "./Trailer.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const Trailer = () => {
  const [trailerPreview, setTrailerPreview] = useState([]);
  const [mainTrailer, setMainTrailer] = useState([]);
  const [mainTrailerShowcase, setMainTrailerShowcase] = useState([]);

  const fetchTrailer = async () => {
    await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setTrailerPreview(data.results);
        setMainTrailer(data.results[0]);
      })
      .catch((err) => console.error(err));
  };

  const fetchTrailerVideo = async () => {
    if (mainTrailer.id) {
      await fetch(
        `https://api.themoviedb.org/3/movie/${mainTrailer.id}/videos?api_key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          data.results &&
            data.results.filter((value) => {
              if (value.type === "Trailer" && value.official === true) {
                setMainTrailerShowcase(value);
              }
            });
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchTrailer();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchTrailerVideo();
    // eslint-disable-next-line
  }, [mainTrailer]);

  return (
    <>
      <div>
        <div className="player_container flex items-end ">
          <span className="trailer_details p-4 xl:text-xl  lg:text-md md:text-sm sm:text-xs text-justify ">
            {mainTrailer && mainTrailer.overview}
          </span>
          <div className="player_wrapper">
            <ReactPlayer
              className="trailer-player"
              url={`https://www.youtube.com/watch?v=${mainTrailerShowcase.key}?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
              playing={true}
              controls={false}
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1, // Hide YouTube logo
                    rel: 0, // Disable related videos
                    showinfo: 0, // Hide video information
                    iv_load_policy: 3, // Disable video annotations
                    loop: 1, //loops the video
                  },
                },
              }}
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <div className="flex text-white w-full mt-5 justify-center">
          {/* <div className="left_side flex items-center">
            <button className="play bg-yellow-500 rounded-lg h-fit p-2">
              Add to WatchList +
            </button>
          </div> */}
          <div className="right_side">
            <Carousel
              trailerPreview={trailerPreview}
              setMainTrailer={setMainTrailer}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Trailer;
