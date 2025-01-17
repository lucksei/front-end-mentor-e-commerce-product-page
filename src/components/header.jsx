import React, { useEffect, useRef, useState } from "react";
import { useCart } from "./../hooks/cart_provider.js";

/**
 * A stateful functional component that renders the app header.
 *
 * The app header contains the company logo, a sidebar button, a cart button, and a profile button. The sidebar button toggles the state of the sidebar.
 *
 * The component's state is a boolean indicating whether the sidebar is currently open.
 *
 * @param {boolean} open - A boolean value indicating whether the sidebar should be open (true) or closed (false).
 *
 * @returns {ReactElement} The app header element.
 */
function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const toggleCartOpen = () => {
    setCartOpen(!cartOpen);
  };

  const { getTotalItems } = useCart();

  /**
   * Toggles the state of the sidebar.
   *
   * @param {boolean} open - A boolean value indicating whether the sidebar should be open (true) or closed (false).
   */
  const handleSidebarOpen = (sidebarOpen) => {
    setSidebarOpen(sidebarOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header--left">
          <Sidebar
            sidebarOpen={sidebarOpen}
            onSidebarOpen={handleSidebarOpen}
          ></Sidebar>
          <SidebarButton onSidebarOpen={handleSidebarOpen}></SidebarButton>
          <h1>
            <Logo></Logo>
          </h1>
        </div>
        <div className="header--right">
          <CartButton
            quantity={getTotalItems()}
            cartOpen={cartOpen}
            onCartOpen={toggleCartOpen}
          ></CartButton>
          <ProfileButton></ProfileButton>
        </div>
      </header>
      <CartModal open={cartOpen}></CartModal>
    </>
  );
}

/**
 * A stateless functional component that renders the company logo.
 *
 * The component does not accept any props.
 *
 * @returns {ReactElement} The company logo element.
 */
function Logo() {
  return (
    <button type="button" className="header--logo">
      <img src={require("./../../images/logo.svg")} alt="logo"></img>
    </button>
  );
}

/**
 * A stateful functional component that renders the sidebar.
 *
 * The component's state is a boolean indicating whether the sidebar is currently open,
 * and a function to toggle the state of the sidebar.
 *
 * @param {boolean} open - A boolean value indicating whether the sidebar should be open (true) or closed (false).
 * @param {function} onSidebarOpen - A function to toggle the state of the sidebar.
 *
 * @returns {ReactElement} The sidebar element.
 */
function Sidebar({ sidebarOpen, onSidebarOpen }) {
  const sidebarRef = useRef();
  const overlayRef = useRef();

  useEffect(() => {
    if (sidebarOpen) {
      sidebarRef.current.classList.remove("sidebar__deactivate");
      sidebarRef.current.classList.add("sidebar__active");
      overlayRef.current.classList.add("overlay__active");
    }
  });

  const handleClick = () => {
    onSidebarOpen(false);
    sidebarRef.current.classList.remove("sidebar__active");
    overlayRef.current.classList.remove("overlay__active");

    // Add a 0.5 second delay before removing the class
    sidebarRef.current.classList.add("sidebar__deactivate");
    setTimeout(() => {
      sidebarRef.current.classList.remove("sidebar__deactivate");
    }, 500);
  };

  return (
    <>
      <div
        className={"sidebar--overlay"}
        ref={overlayRef}
        onClick={handleClick}
      ></div>
      <div className={"sidebar"} ref={sidebarRef}>
        <SidebarCloseButton onSidebarOpen={handleClick}></SidebarCloseButton>
        <ul>
          <li>Collections</li>
          <li>Men</li>
          <li>Women</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </>
  );
}

/**
 * A stateless functional component that renders the sidebar button.
 *
 * @param {function} onsidebarOpen - A function to toggle the state of the sidebar.
 * @returns {ReactElement} The sidebar button element.
 */
function SidebarButton({ onSidebarOpen }) {
  const handleClick = () => {
    onSidebarOpen(true);
  };
  return (
    <button
      className="header--button header--sidebar-button"
      onClick={handleClick}
    >
      <img src={require("./../../images/icon-menu.svg")} alt="menu"></img>
    </button>
  );
}

/**
 * A stateless functional component that renders the close button for the sidebar.
 *
 * @param {function} onSidebarOpen - A function to toggle the state of the sidebar.
 * @returns {ReactElement} The close button element.
 */
function SidebarCloseButton({ onSidebarOpen }) {
  return (
    <button type="button" className="sidebar--button" onClick={onSidebarOpen}>
      <img src={require("./../../images/icon-close.svg")} alt="close"></img>
    </button>
  );
}

/**
 * A stateless functional component that renders the cart button.
 *
 * @returns {ReactElement} The cart button element.
 */
function CartButton({ quantity, cartOpen, onCartOpen }) {
  const cartIcon = (
    <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
        fill="#69707D"
        fillRule="nonzero"
      />
    </svg>
  );

  return (
    <button role="button" className="header--cart-button" onClick={onCartOpen}>
      {cartIcon}
      {quantity > 0 ? (
        <div className="cart-button--badge">{quantity}</div>
      ) : null}
    </button>
  );
}

/**
 * A stateless functional component that renders the profile button.
 *
 * @returns {ReactElement} The profile button element.
 */
function ProfileButton() {
  return (
    <button className="header--profile">
      <img src={require("./../../images/image-avatar.png")} alt="profile"></img>
    </button>
  );
}

function CartModal({ open }) {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    getProductDetails,
  } = useCart();

  return (
    <>
      <div className={"cart-modal" + " " + (open ? "" : "hidden")}>
        <div className="cart-modal--header">
          <h3>Cart</h3>
        </div>
        <div className="cart-modal--body">
          {getTotalItems() === 0 ? (
            <div className="cart-modal--empty">Your cart is empty</div>
          ) : (
            <>
              <div className="cart-modal--items">
                {Object.keys(cartItems).map((itemId) => {
                  return (
                    <CartModalItem
                      key={itemId}
                      itemId={itemId}
                      name={getProductDetails(itemId).name}
                      price={getProductDetails(itemId).price}
                      quantity={cartItems[itemId].quantity}
                      discountPercent={
                        getProductDetails(itemId).discountPercent
                      }
                      itemImage={getProductDetails(itemId).image}
                    ></CartModalItem>
                  );
                })}
              </div>
              <button type="button" className="cart-modal--checkout-button">
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function CartModalItem({
  itemId,
  name,
  price,
  quantity,
  itemImage,
  discountPercent,
}) {
  const parsePrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const parseQuantity = (quantity) => {
    return `x${quantity}`;
  };

  const { removeFromCart } = useCart();
  const handleDelete = () => {
    removeFromCart(itemId);
  };

  const deleteIcon = (
    <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
        fill="#C3CAD9"
        fillRule="nonzero"
      />
    </svg>
  );
  return (
    <div className="cart-modal--cart-item">
      <img className="cart-item--image" src={itemImage} alt="item"></img>
      <span className="cart-item--name">{name}</span>
      <div className="cart-item--values">
        <span className="cart-item--price-unit">
          {parsePrice(price * (discountPercent / 100))}
        </span>
        <span className="cart-item--quantity">{parseQuantity(quantity)}</span>
        <span className="cart-item--price-total">
          {parsePrice(price * (discountPercent / 100) * quantity)}
        </span>
      </div>
      <button className="cart-item--delete-button" onClick={handleDelete}>
        {deleteIcon}
      </button>
    </div>
  );
}

export default Header;
