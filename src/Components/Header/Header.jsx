import React from "react";
import { useState } from "react";
import "../CSS/hamburgerMenu.scss";
import { useDispatch } from "react-redux";
import Hamburger from "./Hamburger";
import Nav from "./Nav";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header>
      <div className="headerContainer">
        <h1>PodLaunch</h1>
      </div>
      <Nav openMenu={openMenu} setOpenMenu={setOpenMenu} />

      <Hamburger toggleMenu={toggleMenu} openMenu={openMenu} />
    </header>
  );
};

export default Header;
