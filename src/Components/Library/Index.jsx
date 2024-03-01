import React from "react";
import SignUp from "./SignUp";
import { useSelector } from "react-redux";
import { selectWindow } from "../../redux/librarySlice";
import Library from "../Library";

const Index = () => {
  const window = useSelector(selectWindow);

  if (window === 0) return <SignUp/>
  if (window === 1) return <Login/>
  if (window === 2) return <Library/>
  return <SignUp />;
};

export default Index;
