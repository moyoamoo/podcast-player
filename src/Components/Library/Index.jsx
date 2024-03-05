import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { selectWindow, setWindow } from "../../redux/librarySlice";
import Library from "./Library";

const Index = () => {
  const window = useSelector(selectWindow);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <button
          onClick={() => {
            dispatch(setWindow(0));
          }}
        >
          Sign Up
        </button>
        <button
          onClick={() => {
            dispatch(setWindow(1));
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
