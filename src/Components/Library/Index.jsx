import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { store } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectWindow, setWindow } from "../../redux/librarySlice";
import Library from "./Library";

const Index = () => {
  const window = useSelector(selectWindow);

  return (
    <>
      <div>
        <button
          onClick={() => {
            store.dispatch(setWindow(0));
          }}
        >
          Sign Up
        </button>
        <button
          onClick={() => {
            store.dispatch(setWindow(1));
          }}
        >
          Login
        </button>
      </div>

      {window === 0 && <SignUp />}
      {window === 1 && <Login />}
      {window === 2 && <Library />}
    </>
  );
};

export default Index;
