import React from "react";

function Header() {
  const headerTitle = "Sneakers";
  return (
    <header className="header">
      <div className="header--left">
        <Sidebar></Sidebar>
        <SidebarButton></SidebarButton>
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

export default Header;

function Logo() {
  return (
    <img
      src={require("./../../images/logo.svg")}
      alt="logo"
      className="header--logo"
    ></img>
  );
}

function Sidebar() {
  return (
    <>
      <div className="sidebar hidden">
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

function SidebarButton() {
  return (
    <button className="header--button">
      <img src={require("./../../images/icon-menu.svg")} alt="menu"></img>
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
