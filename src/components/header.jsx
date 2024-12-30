import React, { useEffect, useRef, useState } from "react";

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

  /**
   * Toggles the state of the sidebar.
   *
   * @param {boolean} open - A boolean value indicating whether the sidebar should be open (true) or closed (false).
   */

  const handleSidebarOpen = (open) => {
    setSidebarOpen(open);
  };

  return (
    <header className="header">
      <div className="header--left">
        <Sidebar open={sidebarOpen} onSidebarOpen={handleSidebarOpen}></Sidebar>
        <SidebarButton onSidebarOpen={handleSidebarOpen}></SidebarButton>
        <h1>
          <Logo></Logo>
        </h1>
      </div>
      <div className="header--right">
        <CartButton></CartButton>
        <ProfileButton></ProfileButton>
      </div>
    </header>
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
function Sidebar({ open, onSidebarOpen }) {
  const sidebarRef = useRef();
  const overlayRef = useRef();

  useEffect(() => {
    if (open) {
      sidebarRef.current.classList.remove("sidebar__deactivate");
      sidebarRef.current.classList.add("sidebar__active");
      overlayRef.current.classList.add("overlay__active");
    } else {
      sidebarRef.current.classList.remove("sidebar__active");
      overlayRef.current.classList.remove("overlay__active");

      // Add a 0.5 second delay before removing the class
      sidebarRef.current.classList.add("sidebar__deactivate");
      setTimeout(() => {
        sidebarRef.current.classList.remove("sidebar__deactivate");
      }, 500);
    }
  });

  const handleClick = () => {
    onSidebarOpen(false);
  };

  return (
    <>
      <div
        className={"sidebar--overlay"}
        ref={overlayRef}
        onClick={handleClick}
      ></div>
      <div className={"sidebar"} ref={sidebarRef}>
        <SidebarCloseButton onSidebarOpen={onSidebarOpen}></SidebarCloseButton>
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
  const handleClick = () => {
    onSidebarOpen(false);
  };
  return (
    <button type="button" className="sidebar--button" onClick={handleClick}>
      <img src={require("./../../images/icon-close.svg")} alt="close"></img>
    </button>
  );
}

/**
 * A stateless functional component that renders the cart button.
 *
 * @returns {ReactElement} The cart button element.
 */
function CartButton() {
  return (
    <button role="button" className="header--button">
      <img src={require("./../../images/icon-cart.svg")} alt="cart"></img>
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
    <button className="header--button header--profile">
      <img src={require("./../../images/image-avatar.png")} alt="profile"></img>
    </button>
  );
}

export default Header;
