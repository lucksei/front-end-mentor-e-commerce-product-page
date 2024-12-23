import React from "react";

function Catalog() {
  const catalogImages = [
    require("./../../images/image-product-1.jpg"),
    require("./../../images/image-product-2.jpg"),
    require("./../../images/image-product-3.jpg"),
    require("./../../images/image-product-4.jpg"),
  ];

  return (
    <>
      <div className="catalog">
        <Carousel images={catalogImages}></Carousel>
        <Thumbnails images={catalogImages}></Thumbnails>
      </div>
    </>
  );
}

export default Catalog;

function Carousel({ images }) {
  return (
    <>
      <div className="carousel">
        <CarouselButton direction="prev"></CarouselButton>
        <CarouselButton direction="next"></CarouselButton>
        <div className="carousel--img-container">
          {images.map((image, index) => {
            return <CarouselImage key={index} image={image}></CarouselImage>;
          })}
        </div>
      </div>
    </>
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
    <div className="catalog--thumbnail-group">
      {images.map((image, index) => {
        return <Thumbnail key={index} image={image}></Thumbnail>;
      })}
    </div>
  );
}

function Thumbnail({ image }) {
  return <img src={image} className="thumbnail-group--thumbnail hidden"></img>;
}
