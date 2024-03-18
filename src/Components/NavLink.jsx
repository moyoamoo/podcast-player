import { NavLink } from "react-router-dom";

const NavLink = ({ destination, text }) => {
  return (
    <>
      <li>
        <NavLink to="search">Search</NavLink>
      </li>
    </>
  );
};

export default NavLink;
