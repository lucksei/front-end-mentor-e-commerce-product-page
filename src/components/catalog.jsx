import React, { useEffect, useRef, useState } from "react";
import useWindowDimensions from "./../hooks/window_dimensions.jsx";

/**
 * Catalog component
 *
 * @returns {ReactElement} The catalog element.
 */
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
          <>
            <Thumbnails
              images={catalogImages}
              currentImage={currentImage}
              onImageSelect={handleImageSelect}
            ></Thumbnails>
            <Lightbox
              images={catalogImages}
              currentImage={currentImage}
              onImageSelect={handleImageSelect}
            ></Lightbox>
          </>
        ) : null}
      </div>
    </>
  );
}

/**
 * Carousel component
 *
 * @param {Array} images - An array of image urls
 * @param {Number} currentImage - The index of the current image
 * @param {Function} onImageSelect - A function to set the current image
 * @returns
 */
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

/**
 * CarouselImagesContainer component
 *
 * @param {Array} images - An array of image urls
 * @param {Number} currentImage - The index of the current image
 * @param {Function} onImageSelect - A function to set the current image
 * @returns
 */
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

/**
 * CarouselImage component
 *
 * @param {String} image - An image url
 * @returns
 */
function CarouselImage({ image }) {
  return <img src={image} className="carousel--img"></img>;
}

/**
 * CarouselButton component
 *
 * @param {String} direction - The direction of the button
 * @param {Number} currentImage - The index of the current image
 * @param {Number} imageCount - The total number of images
 * @param {Function} onImageSelect - A function to set the current image
 * @returns
 */
function CarouselButton({
  direction,
  currentImage,
  imageCount,
  onImageSelect,
}) {
  // SVG icons
  const svgPrev = (
    <>
      <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11 1 3 9l8 8"
          strokeWidth="3"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
    </>
  );

  const svgNext = (
    <>
      <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
        <path d="m2 1 8 8-8 8" strokeWidth="3" fill="none" fillRule="evenodd" />
      </svg>
    </>
  );

  // Setting up flags for direction
  let flagPrev, flagNext;
  if (direction === "prev") {
    flagPrev = true;
    flagNext = false;
  } else if (direction == "next") {
    flagPrev = false;
    flagNext = true;
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
      {direction === "prev" ? svgPrev : svgNext}
    </button>
  );
}

/**
 * Thumbnails component
 *
 * @param {Array} images - An array of image urls
 * @param {Number} currentImage - The index of the current image
 * @param {Function} onImageSelect - A function to set the current image
 * @returns
 */
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

/**
 * Thumbnail component
 *
 * @param {String} image - An image url
 * @param {Number} imageIndex - The index of the image
 * @param {Function} onImageSelect - A function to set the current image
 * @param {Boolean} isActive - Whether the thumbnail is active or not
 * @returns
 */
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

/**
 * Lightbox component
 *
 * @param {Array} images - An array of image urls
 * @param {Number} currentImage - The index of the current image
 * @param {Function} onImageSelect - A function to set the current image
 * @returns
 */
function Lightbox({ images, currentImage, onImageSelect }) {
  const iconClose = (
    <>
      <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
          // fill="#69707D"
          fillRule="evenodd"
        />
      </svg>
    </>
  );

  return (
    <div className="lightbox-modal">
      <div className="lightbox--overlay overlay__active"></div>
      <div className="lightbox-container">
        <button type="button" className="lightbox--close">
          {iconClose}
        </button>
        <div className="catalog--carousel lightbox">
          <CarouselButton
            direction="prev"
            currentImage={currentImage}
            imageCount={images.length}
            onImageSelect={onImageSelect}
          ></CarouselButton>
          <CarouselButton
            direction="next"
            currentImage={currentImage}
            imageCount={images.length}
            onImageSelect={onImageSelect}
          ></CarouselButton>
          <div className="lightbox--images-mask">
            <CarouselImagesContainer
              images={images}
              currentImage={currentImage}
            ></CarouselImagesContainer>
          </div>
        </div>
        <Thumbnails
          images={images}
          currentImage={currentImage}
          onImageSelect={onImageSelect}
        ></Thumbnails>
      </div>
    </div>
  );
}

export default Catalog; // Export the Catalog component
