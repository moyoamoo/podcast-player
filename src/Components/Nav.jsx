import { useState } from "react";

const Nav = () => {
  const [openMenu, setMenu] = useState(false);
  const ToggleMenu = () => {
    setMenu(!openMenu);
  };

  return (
    <>
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
    </>
  );
};

export default Nav;
