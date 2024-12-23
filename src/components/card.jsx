import React from "react";

import Catalog from "./catalog.jsx";

function Card() {
  return (
    <div className="card">
      <Catalog></Catalog>
      <CardBody></CardBody>
    </div>
  );
}

export default Card;

function CardBody() {
  return (
    <div className="card-body">
      <h1>SNEAKER COMPANY</h1>
      <h2>Fall Limited Edition Sneakers</h2>
      <p>
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they'll withstand everything the
        weather can offer.
      </p>
      <CardPrice></CardPrice>
      <CardQuantity></CardQuantity>
      <CardCartButton></CardCartButton>
    </div>
  );
}

function CardPrice() {
  const price = 125.0;
  const discount = 50;
  const oldPrice = price / (1 - discount / 100);

  function formatPrice(price) {
    return `$${price.toFixed(2)}`;
  }
  function formatDiscount(discount) {
    return `${discount}%`;
  }
  return (
    <div className="card-body--price-group">
      <span className="price-group--price">{formatPrice(price)}</span>
      <span className="price-group--discount">{formatDiscount(discount)}</span>
      <span className="price-group--old">{formatPrice(oldPrice)}</span>
    </div>
  );
}

function CardQuantity() {
  return (
    <div className="card-body--quantity">
      <button className="quantity--button-minus">
        <img src={require("./../../images/icon-minus.svg")} alt="minus"></img>
      </button>
      <div className="quantity--value">
        <span>0</span>
      </div>
      <button className="quantity--button-plus">
        <img src={require("./../../images/icon-plus.svg")} alt="plus"></img>
      </button>
    </div>
  );
}

function CardCartButton() {
  return (
    <button className="card-body--cart">
      <span>
        <img src={require("./../../images/icon-cart.svg")} alt="cart"></img>
      </span>
      Add to cart
    </button>
  );
}
