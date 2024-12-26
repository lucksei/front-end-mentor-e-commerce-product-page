import React, { useRef, useState } from "react";

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

function Logo() {
  return (
    <img
      src={require("./../../images/logo.svg")}
      alt="logo"
      className="header--logo"
    ></img>
  );
}

function Sidebar({ open, onSidebarOpen }) {
  return (
    <>
      <div
        className={"sidebar--overlay" + " " + (open ? "overlay__active" : "")}
      ></div>
      <div className={"sidebar" + " " + (open ? "sidebar__active" : "")}>
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

function SidebarButton({ onSidebarOpen }) {
  const handleClick = () => {
    onSidebarOpen(true);
  };
  return (
    <button className="header--button" onClick={handleClick}>
      <img src={require("./../../images/icon-menu.svg")} alt="menu"></img>
    </button>
  );
}

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

function CartButton() {
  return (
    <button className="header--button">
      <img src={require("./../../images/icon-cart.svg")} alt="cart"></img>
    </button>
  );
}

function ProfileButton() {
  return (
    <button className="header--button header--profile">
      <img src={require("./../../images/image-avatar.png")} alt="profile"></img>
    </button>
  );
}

export default Header;
