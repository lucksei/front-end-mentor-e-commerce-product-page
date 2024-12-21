import React from "react";

import Carousel from "./carousel.jsx";

function Card() {
  return (
    <>
      <Carousel></Carousel>
      <CardBody></CardBody>
    </>
  );
}

function CardBody() {
  return (
    <>
      <h2>Sneaker Company</h2>
      <h1>Fall Limited Edition Sneakers</h1>
      <p>
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they'll withstand everything the
        weather can offer.
      </p>
      <div className="card-body--price">
        <span>$125.00</span>
        <span>50%</span>
        <span>$250.00</span>
      </div>
      <div className="card-body--cart"></div>
    </>
  );
}
export default Card;
