import React, { useState } from "react";
import "../CSS/login.scss";
import {
  selectUser,
  setLoggedIn,
  setMessage,
  setWindow,
  selectWindow,
} from "../../redux/librarySlice";
import sha256 from "sha256";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [userInput, setUserInput] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const window = useSelector(selectWindow);
  const onInput = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };

  

  const onSubmit = (e) => {
    e.preventDefault();
    const hashedPassword = sha256(userInput.password + "ZhmyyeQaVRwu7wf");

    if (user.password === hashedPassword) {
      dispatch(setMessage("Password Correct"));
      dispatch(setWindow(2));
      dispatch(setLoggedIn());
    } else {
      dispatch(setMessage("Email and Password are Incorrect! Try Again"));
    }
  };

  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <form onInput={onInput} onSubmit={onSubmit}>
          <div className="inputContainer">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" autoComplete="email" />
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <div className="lowerFormContainer">
            <button>Forgotton Password</button>
            <button
              onClick={() => {
                dispatch(setWindow(0));
              }}
            >
              Sign Up
            </button>
          </div>
          <div className="rememberContainer">
            <input type="checkbox"></input>
            <label htmlFor="remember">Remember Me</label>
          </div>
          <button className="submit" type="submit">
            Login
          </button>
          
        </form>
      </div>
    </>
  );
};

export default Login;
