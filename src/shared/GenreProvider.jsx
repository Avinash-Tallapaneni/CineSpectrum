import { useState, useEffect } from "react";
const API_KEY = process.env.REACT_APP_API_KEY;

const GenreProvider = () => {
  const [availableGenres, setavailableGenres] = useState([]);

  const fetchGenre = () => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setavailableGenres(data.genres);
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

  return availableGenres;
};

export default GenreProvider;
