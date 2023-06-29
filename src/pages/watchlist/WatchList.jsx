import React, { useState, useEffect, useContext } from "react";
import {
  img_300,
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config";

import { MovieContext } from "../../context/MovieProvider";
import GenreProvider from "../../shared/GenreProvider";

import "./WatchList.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const WatchList = () => {
  const { watchList, setWatchList } = useContext(MovieContext);
  const [watchListData, setWatchListData] = useState([]);
  const availableGenres = GenreProvider();

  const fetchWatchList = (list) => {
    fetch(
      `https://api.themoviedb.org/3/${list[1]}/${list[0]}?external_source=imdb_id&api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        setWatchListData((prevlist) => {
          const isMovieAdded = prevlist.findIndex(
            (movie) => movie.id === response.id
          );

          if (isMovieAdded === -1) {
            return [...prevlist, response];
          } else {
            return prevlist;
          }
        });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    watchList.length > 0 && watchList?.map((list) => fetchWatchList(list));

    return () => {
      setWatchListData([]); // unmounting
    };
  }, [watchList]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleMouseLeave = (id) => {
    setIsHovered(id);
  };

  const handleRemoveMovieFromWatchlist = (id) => {
    setWatchList((prev) => prev.filter((movie) => movie[0] !== id));
  };

  return (
    <div>
      {Object.keys(watchListData).length === 0 ? (
        <div className="grid place-content-center text-2xl">
          No shows found, Add shows to Watchlist!!!
        </div>
      ) : (
        <div className="trending_container grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4  gap-2 p-2 px-4">
          {watchListData &&
            watchListData.map((list, index) => (
              <div
                className={`trending rounded-md hover:z-10 `}
                style={{ transition: "transform 3000ms ease-in" }}
                onMouseEnter={() => handleMouseEnter(list.id)}
                onMouseLeave={() => handleMouseLeave("")}
                key={`${list.id}-${index}`}
              >
                <div
                  className={`h-fit relative rounded-md bg-slate-800 overflow-hidden cursor-pointer ${
                    isHovered === list.id ? "object-contain" : ""
                  }`}
                  style={{
                    transform:
                      isHovered === list.id
                        ? "scale(2)  translate(-0%,+25%)"
                        : "",
                    transition: "transform 300ms ease-in",
                  }}
                >
                  <img
                    className="rounded-sm"
                    src={
                      isHovered === list.id
                        ? `${img_500}/${list.backdrop_path}`
                        : `${img_300}/${list.poster_path}`
                    }
                    onError={(e) => {
                      e.target.src =
                        isHovered === list.id
                          ? unavailableLandscape
                          : unavailable;
                    }}
                    alt={list.title}
                  />

                  <div
                    className="absolute right-2  p-0"
                    style={{
                      transform: "scale(0.75)",
                      top: isHovered === list.id ? "-0.25rem" : "0.5rem",
                      right: isHovered === list.id ? "0" : "0.5rem",
                    }}
                  >
                    <span
                      className={
                        list.vote_average >= 7.8
                          ? "bg-green-500 p-0 px-1"
                          : list.vote_average >= 6
                          ? "bg-yellow-500 p-0 px-1"
                          : "bg-red-500 p-0 px-1"
                      }
                      style={{
                        fontSize: isHovered === list.id ? "0.5rem" : "",
                        borderRadius: "0.15rem",
                      }}
                    >
                      {list.vote_average ? list.vote_average.toFixed(1) : "0.0"}
                    </span>
                  </div>

                  <div
                    className={"flex"}
                    style={{
                      display: isHovered === list.id ? "block" : "none",
                      padding: isHovered === list.id ? "0.5rem" : "",
                      fontSize: "0.35rem",
                    }}
                  >
                    <div className="genre_title text-white font-semibold mb-1">
                      {list.title || list.name}
                    </div>

                    <div className="tags flex flex-wrap gap-1 mb-1">
                      {list.release_date && (
                        <span
                          className="bg-red-500 font-bold"
                          style={{
                            padding: "0 0.15rem",
                            borderRadius: "0.05rem",
                          }}
                        >
                          {list.release_date.slice(0, 4)}
                        </span>
                      )}

                      {list.genres &&
                        list.genres.map(
                          (value, index) =>
                            availableGenres.filter(
                              (genre) => genre.id === value.id
                            )[0]?.name && (
                              <span
                                className="bg-green-400 font-bold px-1 text-slate-900 whitespace-nowrap"
                                style={{
                                  padding: "0 0.15rem",
                                  borderRadius: "0.05rem",
                                }}
                                key={`${value.id}-${index}`}
                              >
                                {
                                  availableGenres.filter(
                                    (genre) => genre.id === value.id
                                  )[0]?.name
                                }
                              </span>
                            )
                        )}
                    </div>
                    <div className="genre_overview text-white font-semibold text-justify my-2">
                      {list.overview ? list.overview : "No Data"}
                    </div>
                    <div
                      className="button p-1 mt-1 w-full flex justify-center items-center rounded-sm text-slate-900 font-bold"
                      style={{
                        backgroundColor: "red",
                      }}
                      onClick={() => handleRemoveMovieFromWatchlist(list.id)}
                    >
                      <div> Remove from WatchList - </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;
