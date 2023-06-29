import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieProvider";

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Movies from "./pages/movies/Movies";
import TvShows from "./pages/tvshows/TvShows";
import Trending from "./pages/trending/Trending";
import WatchList from "./pages/watchlist/WatchList";
// import Search from "./pages/search/Search";

import "./App.css";
import AvinashTallapaneni from "./components/footer/AvinashTallapaneni";

const App = () => {
  return (
    <Router>
      <MovieProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/watchlist" element={<WatchList />} />
          {/* <Route path="/search" element={<Search />} /> */}
        </Routes>
      </MovieProvider>
      <AvinashTallapaneni />
    </Router>
  );
};

export default App;
