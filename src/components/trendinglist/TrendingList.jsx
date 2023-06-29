import React, { useState, useEffect } from "react";
import CarouselGeneral from "../carouselgeneral/CarouselGeneral";
import { Link } from "react-router-dom";

import "./TrendingList.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const TrendingList = () => {
  const [TrendingListArray, setTrendingListArray] = useState([]);

  const fetchTrendingList = async (pageNumber) => {
    return await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        return(data.results);
      })
      .catch((err) => console.error(err));
  };

  const fetchData = async () => {
    const firstPage = await fetchTrendingList(1);
    const secondPage = await fetchTrendingList(3);
    setTrendingListArray([...firstPage, ...secondPage]);
  };

  useEffect(() => {
    fetchData();
    return () => {
      fetchData();
    };
    // eslint-disable-next-line
  }, []);


  return (
    <div className="trending flex flex-col gap-6 px-2">
      <div className="header flex items-end justify-between gap-4 text-lg">
        <h1 className="text-3xl">Trending</h1>
        <Link to="/trending" className="cursor-pointer">
          View all <span>&#10093;&#10093;</span>{" "}
        </Link>
      </div>
      <CarouselGeneral data={TrendingListArray} />
    </div>
  );
};

export default TrendingList;
