import React from "react";
import { NavLink } from "react-router-dom";
import { IoMenuOutline, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../CSS/hamburgerMenu.scss";
import logo from "../CSS/assets/pod.png";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setMessage } from "../../redux/librarySlice";

const Header = () => {
  const [openMenu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
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
        localStorage.removeItem("token");
        dispatch(setMessage("Logout Successful"));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header>
      <div className="headerContainer">
        <h1>LaunchPod</h1>
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
                  logout;
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
                to="change_password"
                onClick={() => {
                  setMenu(!openMenu);
                }}
              >
                Change Password
              </NavLink>
            </li>
          )}
        </ul>
        <button className="hamburger" onClick={ToggleMenu}>
          {openMenu ? <IoClose /> : <IoMenuOutline />}
        </button>
      </nav>
    </header>
  );
};

export default Header;
