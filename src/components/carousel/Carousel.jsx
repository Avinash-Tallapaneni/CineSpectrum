import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { img_300, noPicture } from '../../config';

import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ trailerPreview, setMainTrailer }) => {

  const items = trailerPreview.map((poster, index) => {
    return (
      <div
        className="trailer_preview_image_container"
        key={`${poster.id}-${index}`}
        onClick={() => setMainTrailer(poster)}
      >
        <img
          src={
            poster.backdrop_path
              ? `${img_300}/${poster.backdrop_path}`
              : noPicture
          }
          alt={poster?.name}
          onDragStart={handleDragStart}
          className="trailer_preview_image"
        />
      </div>
    );
  });

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      animationType={"fadeout"}
      keyboardNavigation={true}
      autoPlayInterval={1500}
    />
  );
};

export default Carousel;
