import { NavLink } from "react-router-dom";

const Navlink = ({ destination, text }) => {
  return (
    <>
      <li>
        <NavLink to={destination}>{text}</NavLink>
      </li>
    </>
  );
};

export default Navlink;
