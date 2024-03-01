import React from "react";
import { NavLink } from "react-router-dom";
import { IoMenuOutline, IoClose } from "react-icons/io5";
import { useState } from "react";
import "./CSS/hamburgerMenu.scss";

const Header = () => {
  const [openMenu, setMenu] = useState(false);
  const ToggleMenu = () => {
    setMenu(!openMenu);
  };

  return (
    <header>
      <nav>
        <ul className={openMenu ? "showMenu" : "menu"}>
          <li>
            <NavLink to="search">Search</NavLink>
          </li>
          <li>
            <NavLink to="library">Library</NavLink>
          </li>

          <li>
            <NavLink to="signup">Sign Up</NavLink>
          </li>
        </ul>
        <button className="hamburger" onClick={ToggleMenu}>
          {openMenu ? <IoClose /> : <IoMenuOutline />}
        </button>
      </nav>
    </header>
  );
};

export default Header;
