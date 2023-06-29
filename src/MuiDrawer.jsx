import { Drawer, Box, Button } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import SearchIcon from "@mui/icons-material/Search";

const MuiDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Button color="inherit" onClick={() => setIsDrawerOpen(true)}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          p={2}
          width="200px"
          textAlign="right"
          role="presentation"
          onClick={() => setIsDrawerOpen(false)}
          className="bg-slate-800 flex-grow text-slate-200"
        >
          <div className="nav_links_mobile_drawer items-center justify-center">
            <Link
              to="/Home"
              className=" flex justify-end items-center m-3 text-md "
            >
              <HomeIcon />
              <div>Home</div>
            </Link>

            <Link
              to="/movies"
              className=" flex justify-end items-center m-3 gap-2 text-md "
            >
              <MovieIcon />
              <div>Movie</div>
            </Link>

            <Link
              to="/tvshows"
              className=" flex justify-end items-center m-3 gap-2 text-md "
            >
              <TvIcon />
              <div>Tv Shows</div>
            </Link>

            <Link
              to="/trending"
              className=" flex justify-end items-center m-3 gap-2 text-md "
            >
              <TrendingUpIcon />
              <div>Trending</div>
            </Link>

            <Link
              to="/watchlist"
              className=" flex justify-end items-center m-3 gap-2 text-md "
            >
              <AddToQueueIcon />
              <div>WatchList</div>
            </Link>

            <Link
              to="/search"
              className="search-box-drawer flex m-3 gap-2 items-center justify-end text-md"
            >
              <SearchIcon />
              <div>Search</div>
            </Link>
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export default MuiDrawer;
