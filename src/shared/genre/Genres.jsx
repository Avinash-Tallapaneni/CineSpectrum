import React, { useState, useEffect } from "react";
import GenreProvider from "../GenreProvider";

import "./Genres.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const Genres = ({ selectedGenres, setSelectedGenres }) => {
  const availableGenres = GenreProvider();

  const [genres, setGenres] = useState(availableGenres);

  const fetchGenre = () => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchGenre();

    return () => {
      fetchGenre();
    };
  }, []);

  const addGenre = (genreId) => {
    setSelectedGenres([...selectedGenres, genreId]);
    setGenres(genres.filter((genre) => genre.id !== genreId));
  };

  const removeGenre = (genreId) => {
    setSelectedGenres(selectedGenres.filter((remove) => remove !== genreId));

    const addGenreBack = availableGenres.filter(
      (selected) => selected.id === genreId
    )[0];
    setGenres([...genres, addGenreBack]);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 p-4 ">
        {selectedGenres &&
          selectedGenres.map((genreId) => {
            return (
              <div
                className=" p-1 px-2 rounded-lg bg-slate-700 flex items-center gap-1 cursor-pointer"
                onClick={() => {
                  removeGenre(genreId);
                }}
                key={genreId}
              >
                <span>
                  {availableGenres &&
                    availableGenres.filter((genre) => genre.id === genreId)[0]
                      .name}
                </span>
                <span
                  className="hover bg-slate-500 rounded-full h-4 w-4 flex items-center justify-center"
                  // style={{ padding: "0.25rem" }}
                >
                  X
                </span>
              </div>
            );
          })}
      </div>

      <div className="flex flex-wrap gap-2 p-4 ">
        {genres
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .map((genre) => {
            return (
              <span
                className="p-1 px-2 rounded-lg bg-slate-500 cursor-pointer"
                onClick={() => {
                  addGenre(genre.id);
                }}
                key={genre.id}
              >
                {genre.name}
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default Genres;
