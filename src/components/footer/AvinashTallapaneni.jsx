import React from "react";
import { Link } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./AvinashTallapaneni.css";

const AvinashTallapaneni = () => {
  return (
    <div className="w-screen h-10 flex justify-center items-center fixed bottom-0 bg-slate-900 z-20  gap-4">
      <CodeIcon />
      <Link to="https://twitter.com/TallapaneniAvi" target="_blank">
        Coded by Avinash Tallapaneni
      </Link>
      <Link to="https://twitter.com/TallapaneniAvi" target="_blank">
        <TwitterIcon />
      </Link>
      <Link to="https://github.com/avinash-tallapaneni" target="_blank">
        <GitHubIcon />
      </Link>
    </div>
  );
};

export default AvinashTallapaneni;
