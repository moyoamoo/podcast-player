import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/librarySlice";
import HeaderLink from "./HeaderLink";
import { logout } from "../../apiRequests/Account/logoutUser";

const Nav = ({ openMenu, setOpenMenu }) => {
  const token = useSelector(selectToken);

  return (
    <>
      <nav>
        <ul className={openMenu ? "showMenu" : "menu"}>
          <HeaderLink
            to="search"
            text="Search"
            setOpenMenu={setOpenMenu}
            openMenu={openMenu}
          />
          <HeaderLink
            to="library"
            text="Library"
            setOpenMenu={setOpenMenu}
            openMenu={openMenu}
          />
          <HeaderLink
            to="queue"
            text="Queue"
            setOpenMenu={setOpenMenu}
            openMenu={openMenu}
          />

          <HeaderLink
            to="discover"
            text="Discover"
            setOpenMenu={setOpenMenu}
            openMenu={openMenu}
          />

          {token ? (
            <HeaderLink
              to="/"
              text="Logout"
              setOpenMenu={setOpenMenu}
              openMenu={openMenu}
              logout={logout}
            />
          ) : (
            <HeaderLink
              to="/"
              text="Login"
              setOpenMenu={setOpenMenu}
              openMenu={openMenu}
            />
          )}
          {token && (
            <HeaderLink
              to="update_account"
              text="Update Account Details"
              setOpenMenu={setOpenMenu}
              openMenu={openMenu}
            />
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
