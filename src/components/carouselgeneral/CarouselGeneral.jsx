import React, { useState, useEffect, useRef } from "react";
import { img_300, noPicture } from "../../config";

import { Link } from "react-router-dom";
import "./CarouselGeneral.css";

const CarouselGeneral = (props) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(0);
  const [pageLinked, setPageLinked] = useState("");

  const handleleft = () => {
    if (sliderIndex > 0) {
      setSliderIndex((prev) => prev - 1);
    }
  };
  const handleRight = () => {
    if (sliderIndex < Math.ceil(props.data.length / itemsPerScreen) - 1) {
      setSliderIndex((prev) => prev + 1);
    }
  };

  const handleLinkToPage = (event) => {
    const currentTarget =
      event.currentTarget.parentNode.parentNode.parentNode.parentNode.firstChild
        .firstChild.firstChild;

    // if (currentTarget.textContent === "Movies") {
    //   setPageLinked("/movies");
    // } else if (currentTarget.textContent === "Tv Series") {
    //   setPageLinked("/tvshows");
    // } else if (currentTarget.textContent === "Trending") {
    //   setPageLinked("/trending");
    // }

    let link = "";

    if (currentTarget.textContent === "Movies") {
      link = "/movies";
    } else if (currentTarget.textContent === "Tv Series") {
      link = "/tvshows";
    } else if (currentTarget.textContent === "Trending") {
      link = "/trending";
    }

    setPageLinked(link);
  };

  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current.querySelector(".poster_container");
    if (element) {
      const computedStyle = window.getComputedStyle(element);
      const itemsPerScreen = parseInt(
        computedStyle.getPropertyValue("--items-per-screen"),
        10
      );
      setItemsPerScreen(itemsPerScreen);
      setSliderIndex(0);
    }
  }, [itemsPerScreen]);

  return (
    <div
      className="movielist_container relative overflow-hidden flex px-0 gap-2 "
      ref={elementRef}
    >
      <button
        className="left_arrow arrow absolute w-12 flex-none text-4xl bg-gradient-to-r from-black to-transparent mx-2.5 z-10 "
        onClick={() => handleleft()}
      >
        <span>&#10092;</span>
      </button>

      <Link to={pageLinked}>
        <div
          className="poster_container flex"
          style={{ "--slider-index": sliderIndex }}
        >
          {props.data &&
            props.data.map((item, index) => (
              <div
                className="image_container"
                key={`${item.id}-${index}`}
                onClick={(e) => handleLinkToPage(e)}
              >
                <img
                  src={
                    item.poster_path
                      ? `${img_300}/${item.poster_path}`
                      : noPicture
                  }
                  alt={item?.name}
                />
              </div>
            ))}
        </div>
      </Link>

      <button
        className="right_arrow arrow absolute w-12 flex-none text-4xl bg-gradient-to-r from-transparent to-black mx-2.5 z-10"
        onClick={() => handleRight()}
      >
        <span>&#10093;</span>
      </button>
    </div>
  );
};

export default CarouselGeneral;
