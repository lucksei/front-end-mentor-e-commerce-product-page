import React, { useState } from "react";

import Catalog from "./catalog.jsx";

import { useCart } from "./../hooks/cart_provider.js";

function Card() {
  // React hook to set the quantity
  let [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    if (quantity <= 99) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="card">
      <Catalog></Catalog>
      <CardBody
        itemId="p-0001"
        quantity={quantity}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      ></CardBody>
    </div>
  );
}

export default Card;

function CardBody({ itemId, quantity, incrementQuantity, decrementQuantity }) {
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
      <CardQuantity
        quantity={quantity}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      ></CardQuantity>
      <CardCartButton itemId={itemId} quantity={quantity}></CardCartButton>
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

function CardQuantity({ quantity, incrementQuantity, decrementQuantity }) {
  return (
    <div className="card-body--quantity">
      <button className="quantity--button-minus" onClick={decrementQuantity}>
        <img src={require("./../../images/icon-minus.svg")} alt="minus"></img>
      </button>
      <div className="quantity--value">
        <span>{quantity}</span>
      </div>
      <button className="quantity--button-plus" onClick={incrementQuantity}>
        <img src={require("./../../images/icon-plus.svg")} alt="plus"></img>
      </button>
    </div>
  );
}

function CardCartButton({ itemId, quantity }) {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const onAddToCart = () => {
    addToCart(itemId, quantity);
  };

  const cartIcon = (
    <>
      <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
          fillRule="nonzero"
        />
      </svg>
    </>
  );
  return (
    <button type="button" className="card-body--cart" onClick={onAddToCart}>
      <span>{cartIcon}</span>
      Add to cart
    </button>
  );
}
