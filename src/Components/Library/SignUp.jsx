import React, { useState } from "react";
import "../CSS/login.scss";
import { setNewUser, setWindow, setMessage } from "../../redux/librarySlice";
import { store } from "../../redux/store";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [userInput, setUserInput] = useState({});
  const dispatch = useDispatch();

  const onInput = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setNewUser(userInput));
    dispatch(setWindow(1));
    dispatch(setMessage("Account Created"));
  };
  console.log(userInput);
  return (
    <>
      <h1>Create an Account</h1>
      <form onInput={onInput} onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <button>Sign Up</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
