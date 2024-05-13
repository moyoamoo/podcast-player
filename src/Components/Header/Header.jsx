import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoMenuOutline, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../CSS/hamburgerMenu.scss";
import logo from "../CSS/assets/pod.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessage, setToken, selectToken } from "../../redux/librarySlice";

const Header = () => {
  const [openMenu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const ToggleMenu = () => {
    setMenu(!openMenu);
  };

  const logout = async () => {
    try {
      const { data } = await axios.delete("http://localhost:6001/logout", {
        headers: {
          token: token,
        },
      });

      if (data.status === 1) {
        dispatch(setToken(undefined));
        dispatch(setMessage("Logout Successful"));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header>
      <div className="headerContainer">
      <button className="hamburger" onClick={ToggleMenu}>
          {openMenu ? <IoClose /> : <IoMenuOutline />}
        </button>
       
      </div>
      <nav>
        <ul className={openMenu ? "showMenu" : "menu"}>
       
          <li>
            <NavLink
              to="search"
              onClick={() => {
                setMenu(!openMenu);
              }}
            >
              Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="library"
              onClick={() => {
                setMenu(!openMenu);
              }}
            >
              Library
            </NavLink>
          </li>
          <li>
            <NavLink
              to="queue"
              onClick={() => {
                setMenu(!openMenu);
              }}
            >
              Queue
            </NavLink>
          </li>
          <li>
            <NavLink
              to="discover"
              onClick={() => {
                setMenu(!openMenu);
              }}
            >
              Discover
            </NavLink>
          </li>

          {token ? (
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  setMenu(!openMenu);
                  logout();
                }}
              >
                Logout
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  setMenu(!openMenu);
                }}
              >
                Login
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink
                to="update_account"
                onClick={() => {
                  setMenu(!openMenu);
                }}
              >
                Update Account
              </NavLink>
            </li>
          )}
        </ul>

      </nav>
    </header>
  );
};

export default Header;
