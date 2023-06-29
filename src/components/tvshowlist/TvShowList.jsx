import React, { useState, useEffect } from "react";
import CarouselGeneral from "../carouselgeneral/CarouselGeneral";
import { Link } from "react-router-dom";

import "./TvShowList.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const TvshowList = () => {
  const [TvshowListarray, setTvshowListarray] = useState([]);

  const fetchTvshowList = async (pageNumber) => {
    return await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        return data.results;
      })
      .catch((err) => console.error(err));
  };

  const fetchData = async () => {
    const firstPage = await fetchTvshowList(1);
    const secondPage = await fetchTvshowList(3);
    setTvshowListarray([...firstPage, ...secondPage]);
  };

  useEffect(() => {
    fetchData();
    return () => {
      fetchData();
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className="TvshowList flex flex-col gap-6 px-2">
      <div className="header flex items-end justify-between gap-4 text-lg">
        <h1 className="text-3xl">Tv Series</h1>
        <Link to="/tvshows" className="cursor-pointer ">
          View all <span>&#10093;&#10093;</span>
        </Link>
      </div>
      <CarouselGeneral data={TvshowListarray} />
    </div>
  );
};
export default TvshowList;
