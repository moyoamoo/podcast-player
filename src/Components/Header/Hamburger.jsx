import { IoMenuOutline, IoClose } from "react-icons/io5";

const Hamburger = ({ setMenu, openMenu }) => {
  const ToggleMenu = () => {
    setMenu(!openMenu);
  };

  return (
    <>
      <button className="hamburger" onClick={ToggleMenu}>
        {openMenu ? <IoClose /> : <IoMenuOutline />}
      </button>
    </>
  );
};

export default Hamburger;
