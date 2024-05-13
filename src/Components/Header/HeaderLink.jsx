import { NavLink } from "react-router-dom";

const HeaderLink = ({ to, text, setOpenMenu, openMenu, logout }) => {
  return (
    <>
      <li>
        <NavLink
          to={to}
          onClick={() => {
            setOpenMenu(!openMenu);
            logout && logout();
          }}
        >
          {text}
        </NavLink>
      </li>
    </>
  );
};

export default HeaderLink;
