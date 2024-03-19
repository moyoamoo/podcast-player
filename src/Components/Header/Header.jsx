import React from "react";
import { NavLink } from "react-router-dom";
import { IoMenuOutline, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../CSS/hamburgerMenu.scss";
import logo from "../CSS/assets/pod.png"

const Header = () => {
  const [openMenu, setMenu] = useState(false);
  const ToggleMenu = () => {
    setMenu(!openMenu);
  };

  return (
    <header>
      <div className="headerContainer">
       <Link to="/"> <img src={logo}/></Link>
      </div>
      <nav>
        <ul className={openMenu ? "showMenu" : "menu"}>
          <li>
            <NavLink to="search">Search</NavLink>
          </li>
          <li>
            <NavLink to="library">Library</NavLink>
          </li>
          <li>
            <NavLink to="queue">Queue</NavLink>
          </li>
          <li>
            <NavLink to="discover">Discover</NavLink>
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
