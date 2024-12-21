import React from "react";

function Header() {
  const headerTitle = "Sneakers";
  return (
    <header className="header">
      <div className="header--left">
        <SidebarButton></SidebarButton>
        <h1>{headerTitle}</h1>
        <Sidebar></Sidebar>
      </div>
      <div className="header--right">
        <button>+</button>
        <div>0</div>
        <button>-</button>
        <CartButton></CartButton>
        <ProfileButton></ProfileButton>
      </div>
    </header>
  );
}

function Sidebar() {
  return (
    <>
      <ul>
        <li>Collections</li>
        <li>Men</li>
        <li>Women</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </>
  );
}

function SidebarButton() {
  return <button>Menu</button>;
}

function CartButton() {
  return <button>Add to cart</button>;
}

function ProfileButton() {
  return <button>Profile</button>;
}

export default Header;
