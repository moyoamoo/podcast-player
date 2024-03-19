import { useState } from "react";
import Navlink from "../NavLink";
import Hamburger from "./Hamburger";

const Nav = () => {
  const [openMenu, setMenu] = useState(false);
 

  return (
    <>
      <nav>
        <ul className={openMenu ? "showMenu" : "menu"}>
          <Navlink destination="search" text="search" />
          <Navlink destination="library" text="library" />
          <Navlink destination="queue" text="queue" />
          <Navlink destination="discover" text="discover" />
        </ul>
        <Hamburger openMenu={openMenu} setMenu={setMenu} />
      </nav>
    </>
  );
};

export default Nav;
