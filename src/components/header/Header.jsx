import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import SearchIcon from "@mui/icons-material/Search";

import MuiDrawer from "../../MuiDrawer";

import "./Header.css";
import Search from "../../pages/search/Search";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const location = useLocation();
  const isSearchEnabled = location.pathname === "/search";

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div>
        <div className="header w-screen flex items-center justify-between py-3 px-5 bg-slate-900">
          <div className="logo whitespace-nowrap text-3xl ">
            <Link to="/">
              <p>Cine Spectrum</p>
            </Link>
          </div>

          <div className="nav_links  flex items-center justify-center flex-grow whitespace-nowrap">
            <Link to="/Home" className=" mx-3 text-xl block">
              Home
            </Link>
            <Link to="/movies" className=" mx-3 text-xl block">
              Movies
            </Link>
            <Link to="/tvshows" className=" mx-3 text-xl block">
              Tv shows
            </Link>
            <Link to="/trending" className=" mx-3 text-xl block">
              Trending
            </Link>
            <Link to="/watchlist" className=" mx-3 text-xl block">
              WatchList
            </Link>
          </div>

          <div className="nav_links_mobile items-center justify-center flex-grow">
            <Link to="/Home" className=" mx-3 text-xl block">
              <HomeIcon />
            </Link>
            <Link to="/movies" className=" mx-3 text-xl block">
              <MovieIcon />
            </Link>
            <Link to="/tvshows" className=" mx-3 text-xl block">
              <TvIcon />
            </Link>
            <Link to="/trending" className=" mx-3 text-xl block">
              <TrendingUpIcon />
            </Link>
            <Link to="/watchlist" className=" mx-3 text-xl block">
              <AddToQueueIcon />
            </Link>
          </div>

          <Link
            to="/search"
            className="search-box flex px-2 items-center gap-2 rounded text-xl"
            style={{
              display: isSearchEnabled && windowWidth <= 768 ? "none" : "block",
            }}
          >
            <input
              className="search bg-transparent"
              type="text"
              placeholder="Search for shows"
              value={searchValue}
              onChange={handleInputChange}
            />
            <SearchIcon className="cursor-pointer" />
          </Link>

          <div className="nav_link_mobile_menu">
            <MuiDrawer />
          </div>
        </div>
        {isSearchEnabled && windowWidth <= 768 && (
          <Link
            to="/search"
            className="search-box-mobile flex px-2 items-center gap-2 rounded text-xl"
          >
            <input
              className="bg-transparent"
              type="text"
              placeholder="Search for shows"
              value={searchValue}
              onChange={handleInputChange}
            />
            <SearchIcon className="cursor-pointer" />
          </Link>
        )}
      </div>
      {isSearchEnabled && <Search searchValue={searchValue} />}
    </div>
  );
};

export default Header;
