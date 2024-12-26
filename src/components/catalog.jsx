import React, { useEffect, useRef } from "react";
import useWindowDimensions from "./../hooks/window_dimensions.jsx";

function Catalog() {
  const windowMedium = 768;
  const catalogImages = [
    require("./../../images/image-product-1.jpg"),
    require("./../../images/image-product-2.jpg"),
    require("./../../images/image-product-3.jpg"),
    require("./../../images/image-product-4.jpg"),
  ];

  // React hook to get window dimensions
  const { height, width } = useWindowDimensions();

  return (
    <>
      <div className="catalog">
        <Carousel images={catalogImages}></Carousel>
        {width > windowMedium ? (
          <Thumbnails images={catalogImages}></Thumbnails>
        ) : null}
      </div>
    </>
  );
}

function Carousel({ images }) {
  const windowMedium = 768;
  const { height, width } = useWindowDimensions();

  return (
    <>
      <div className="catalog--carousel">
        {width < windowMedium ? (
          <CarouselButton direction="prev"></CarouselButton>
        ) : null}
        {width < windowMedium ? (
          <CarouselButton direction="next"></CarouselButton>
        ) : null}
        <CarouselImagesContainer images={images}></CarouselImagesContainer>
      </div>
    </>
  );
}

function CarouselImagesContainer({ images }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    const imgCount = images.length;
    ref.current.style.setProperty("--img-count", imgCount);
  });

  return (
    <div className="carousel--img-container" ref={ref}>
      {images.map((image, index) => {
        return <CarouselImage key={index} image={image}></CarouselImage>;
      })}
    </div>
  );
}

function CarouselImage({ image }) {
  return <img src={image} className="carousel--img"></img>;
}

function CarouselButton({ direction }) {
  let flagPrev, flagNext;
  let imageIcon;

  if (direction === "prev") {
    flagPrev = true;
    flagNext = false;
    imageIcon = require("./../../images/icon-previous.svg");
  } else if (direction == "next") {
    flagPrev = false;
    flagNext = true;
    imageIcon = require("./../../images/icon-next.svg");
  }

  return (
    <button
      type="button"
      className={"carousel--button " + (flagPrev ? "left" : "right")}
    >
      <img src={imageIcon} alt={flagPrev ? "prev" : "next"} />
    </button>
  );
}

function Thumbnails({ images }) {
  return (
    <div className="catalog--thumbnail-group ">
      {images.map((image, index) => {
        return <Thumbnail key={index} image={image}></Thumbnail>;
      })}
    </div>
  );
}

function Thumbnail({ image }) {
  return (
    <img
      src={image}
      className="thumbnail-group--thumbnail thumbnail__active"
    ></img>
  );
}

export default Catalog;
