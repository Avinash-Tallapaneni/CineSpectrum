import React, { useState, useEffect, useContext } from "react";
import {
  img_300,
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config";
import Genres from "../../shared/genre/Genres";

import GenreProvider from "../../shared/GenreProvider";
import CustomPagination from "../../shared/CustomPagination";
import { MovieContext } from "../../context/MovieProvider";

import "./Movies.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const Movies = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movieListarray, setmovieListarray] = useState([]);
  const [pageNumber, setPageNumber] = useState(2);
  const [totalPages, setTotalPages] = useState();
  const { watchList, setWatchList, addMovieToWatchList } =
    useContext(MovieContext);
  const availableGenres = GenreProvider();

  const genreSearchURL =
    selectedGenres.length > 1
      ? selectedGenres.reduce((acc, val) => acc + "," + val)
      : "";

  const fetchMovieList = async (pageNumber) => {
    return await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_genres=${genreSearchURL}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalPages(data.total_pages);
        return data.results;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchData = async () => {
    const firstPage = await fetchMovieList(pageNumber - 1);
    const secondPage = await fetchMovieList(pageNumber);
    setmovieListarray([...firstPage, ...secondPage]);
  };

  useEffect(() => {
    fetchData();
    return () => {
      fetchData();
    };
    // eslint-disable-next-line
  }, [selectedGenres, pageNumber]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleMouseLeave = (id) => {
    setIsHovered(id);
  };

  const handleAddMovieToWatchList = (id, moviestring) => {
    const isMovieInWatchList = watchList.includes(id);
    if (isMovieInWatchList) {
      const updateWatchList = watchList.filter((list) => list[0] !== id);
      setWatchList(updateWatchList);
    } else {
      addMovieToWatchList(id, moviestring);
    }
  };

  return (
    <>
      <Genres
        className="text-2xl bg-slate-500 "
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />

      {movieListarray.length === 0 ? (
        <div
          className="grid place-content-center text-2xl "
          style={{ height: "15vh" }}
        >
          No results found, Try changing the Genre combination or remove one
        </div>
      ) : (
        <div className="movieList_container grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 gap-2 p-2 px-4">
          {movieListarray &&
            movieListarray.map((shows, index) => (
              <div
                className={`movieList rounded-md hover:z-10 `}
                style={{ transition: "transform 3000ms ease-in" }}
                onMouseEnter={() => handleMouseEnter(shows.id)}
                onMouseLeave={() => handleMouseLeave("")}
                key={`${shows.id}-${index}`}
              >
                <div
                  className={`h-fit relative rounded-md bg-slate-800 overflow-hidden cursor-pointer ${
                    isHovered === shows.id ? "object-contain" : ""
                  }`}
                  style={{
                    transform:
                      isHovered === shows.id
                        ? "scale(2)  translate(-0%,+25%)"
                        : "",
                    transition: "transform 300ms ease-in",
                  }}
                >
                  <img
                    className="rounded-sm"
                    src={
                      isHovered === shows.id
                        ? `${img_500}/${shows.backdrop_path}`
                        : `${img_300}/${shows.poster_path}`
                    }
                    onError={(e) => {
                      e.target.src =
                        isHovered === shows.id
                          ? unavailableLandscape
                          : unavailable;
                    }}
                    alt={shows.name}
                  />

                  <div
                    className="absolute right-2  p-0"
                    style={{
                      transform: "scale(0.75)",
                      top: isHovered === shows.id ? "-0.25rem" : "0.5rem",
                      right: isHovered === shows.id ? "0" : "0.5rem",
                    }}
                  >
                    <span
                      className={
                        shows.vote_average >= 7.8
                          ? "bg-green-500 p-0 px-1"
                          : shows.vote_average >= 6
                          ? "bg-yellow-500 p-0 px-1"
                          : "bg-red-500 p-0 px-1"
                      }
                      style={{
                        fontSize: isHovered === shows.id ? "0.5rem" : "",
                        borderRadius: "0.15rem",
                      }}
                    >
                      {shows.vote_average
                        ? shows.vote_average.toFixed(1)
                        : "0.0"}
                    </span>
                  </div>

                  <div
                    className={"flex"}
                    style={{
                      display: isHovered === shows.id ? "block" : "none",
                      padding: isHovered === shows.id ? "0.5rem" : "",
                      fontSize: "0.35rem",
                    }}
                  >
                    <div className="genre_title text-white font-semibold mb-1">
                      {shows.title || shows.name}
                    </div>
                    <div className=" tags flex flex-wrap gap-1 mb-1">
                      {shows.release_date && (
                        <span
                          className="bg-red-500 font-bold"
                          style={{
                            padding: "0 0.15rem",
                            borderRadius: "0.05rem",
                          }}
                        >
                          {shows.release_date.slice(0, 4)}
                        </span>
                      )}

                      {shows.genre_ids &&
                        shows.genre_ids.map(
                          (id, index) =>
                            availableGenres.filter(
                              (genre) => genre.id === id
                            )[0]?.name && (
                              <span
                                className="bg-green-400 font-bold px-1 text-slate-900 whitespace-nowrap"
                                style={{
                                  padding: "0 0.15rem",
                                  borderRadius: "0.05rem",
                                }}
                                key={`${id}-${index}`}
                              >
                                {
                                  availableGenres.filter(
                                    (genre) => genre.id === id
                                  )[0]?.name
                                }
                              </span>
                            )
                        )}
                    </div>
                    <div className="genre_overview text-white font-semibold text-justify my-2 ">
                      {shows.overview ? shows.overview : "No Data"}
                    </div>
                    <div
                      className="button p-1 mt-1 w-full flex justify-center items-center rounded-sm text-slate-900 font-bold"
                      style={{
                        backgroundColor:
                          watchList.filter((id) => id[0] === shows.id).length >
                          0
                            ? "red"
                            : "green",
                      }}
                      onClick={() =>
                        handleAddMovieToWatchList(shows.id, "movie")
                      }
                    >
                      {watchList.filter((id) => id[0] === shows.id).length >
                      0 ? (
                        <div> Remove from WatchList - </div>
                      ) : (
                        <div>Add to WatchList +</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="flex justify-center my-4">
        <CustomPagination
          totalPages={totalPages}
          setPageNumber={setPageNumber}
        />
      </div>
    </>
  );
};

export default Movies;
