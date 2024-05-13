import { IoMenuOutline, IoClose } from "react-icons/io5";

const Hamburger = ({toggleMenu, openMenu}) => {

  return (
    <>
      <button className="hamburger" onClick={toggleMenu}>
        {openMenu ? <IoClose /> : <IoMenuOutline />}
      </button>
    </>
  );
};

export default Hamburger;
