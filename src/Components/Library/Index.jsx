import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { useSelector } from "react-redux";
import { selectWindow } from "../../redux/librarySlice";
import Library from "./Library";
import ChangePassword from "./ChangePassword";

const Index = () => {
  const window = useSelector(selectWindow);

  return (
    <>
      <main className="mainContainer">
        {window === 0 && <SignUp />}
        {window === 1 && <Login />}
        {window === 2 && <Library />}
      </main>
    </>
  );
};

export default Index;
