import React, { createContext, useState } from "react";

const MovieContext = createContext();

//provider

const MovieProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  const addMovieToWatchList = (movieId, moviestring) => {
    const isMovieAddedIndex = watchList.findIndex(
      (list) => list[0] === movieId
    );

    if (isMovieAddedIndex !== -1) {
      const updateWatchList = watchList.filter(
        (list, index) => index !== isMovieAddedIndex
      );
      setWatchList(updateWatchList);
    } else {
      setWatchList([...watchList, [movieId, moviestring]]);
    }
  };

  return (
    <MovieContext.Provider
      value={{ watchList, setWatchList, addMovieToWatchList }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };
