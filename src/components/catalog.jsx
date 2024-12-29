import React, { useEffect, useRef, useState } from "react";
import useWindowDimensions from "./../hooks/window_dimensions.jsx";

function Catalog() {
  const windowMedium = 768;
  const catalogImages = [
    require("./../../images/image-product-1.jpg"),
    require("./../../images/image-product-2.jpg"),
    require("./../../images/image-product-3.jpg"),
    require("./../../images/image-product-4.jpg"),
  ];

  // React hook to set current image
  const [currentImage, setCurrentImage] = useState(0);
  const handleImageSelect = (index) => {
    setCurrentImage(index);
  };

  // React hook to get window dimensions
  const { height, width } = useWindowDimensions();

  return (
    <>
      <div className="catalog">
        <Carousel
          images={catalogImages}
          currentImage={currentImage}
          onImageSelect={handleImageSelect}
        ></Carousel>
        {width > windowMedium ? (
          <Thumbnails
            images={catalogImages}
            currentImage={currentImage}
            onImageSelect={handleImageSelect}
          ></Thumbnails>
        ) : null}
      </div>
    </>
  );
}

function Carousel({ images, currentImage, onImageSelect }) {
  const windowMedium = 768;
  const { height, width } = useWindowDimensions();

  return (
    <>
      <div className="catalog--carousel">
        {width < windowMedium ? (
          <CarouselButton
            direction="prev"
            currentImage={currentImage}
            imageCount={images.length}
            onImageSelect={onImageSelect}
          ></CarouselButton>
        ) : null}
        {width < windowMedium ? (
          <CarouselButton
            direction="next"
            currentImage={currentImage}
            imageCount={images.length}
            onImageSelect={onImageSelect}
          ></CarouselButton>
        ) : null}
        <CarouselImagesContainer
          images={images}
          currentImage={currentImage}
        ></CarouselImagesContainer>
      </div>
    </>
  );
}

function CarouselImagesContainer({ images, currentImage, onImageSelect }) {
  // React hook to get image count and set css variable
  const elementRef = useRef();
  useEffect(() => {
    if (!elementRef.current) return;
    const imgCount = images.length;
    elementRef.current.style.setProperty("--img-count", imgCount);
  });

  // React hook to set position for displaying the current image
  useEffect(() => {
    if (!elementRef.current) return;
    elementRef.current.style.setProperty("--current-img", currentImage);
  });

  return (
    <div className="carousel--img-container" ref={elementRef}>
      {images.map((image, index) => {
        return <CarouselImage key={index} image={image}></CarouselImage>;
      })}
    </div>
  );
}

function CarouselImage({ image }) {
  return <img src={image} className="carousel--img"></img>;
}

function CarouselButton({
  direction,
  currentImage,
  imageCount,
  onImageSelect,
}) {
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

  // React hook to set position for displaying the current image
  const handleClick = () => {
    if (flagPrev && currentImage > 0) {
      onImageSelect(currentImage - 1);
    } else if (flagNext && currentImage < imageCount - 1) {
      onImageSelect(currentImage + 1);
    }
  };

  return (
    <button
      type="button"
      className={
        "carousel--button" +
        " " +
        (flagPrev ? "left" : "right") +
        " " +
        (flagPrev && currentImage === 0 ? "hidden" : "") +
        " " +
        (flagNext && currentImage === imageCount - 1 ? "hidden" : "")
      }
      onClick={handleClick}
    >
      <img src={imageIcon} alt={flagPrev ? "prev" : "next"} />
    </button>
  );
}

function Thumbnails({ images, currentImage, onImageSelect }) {
  return (
    <div className="catalog--thumbnail-group ">
      {images.map((image, index) => {
        return (
          <Thumbnail
            key={index}
            image={image}
            imageIndex={index}
            onImageSelect={onImageSelect}
            isActive={index === currentImage ? true : false}
          ></Thumbnail>
        );
      })}
    </div>
  );
}

function Thumbnail({ image, imageIndex, onImageSelect, isActive }) {
  const imageRef = useRef(null);
  // React hook to set position for displaying the current image
  const handleClick = () => {
    onImageSelect(imageIndex);
  };

  return (
    <button
      type="button"
      disabled={isActive}
      className={
        "thumbnail-group--thumbnail" +
        " " +
        (isActive ? "thumbnail__active" : "")
      }
      ref={imageRef}
      onClick={handleClick}
    >
      <img src={image}></img>
    </button>
  );
}

export default Catalog;
