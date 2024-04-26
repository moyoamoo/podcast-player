import React, { useState } from "react";
import "../CSS/login.scss";
import {
  selectUser,
  setLoggedIn,
  setMessage,
  setWindow,
  selectWindow,
} from "../../redux/librarySlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Joi from "joi";

const Login = () => {
  const [userInput, setUserInput] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const window = useSelector(selectWindow);
  const token = localStorage.getItem("token");

  //validation schema
  const schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(4).required(),
  };

  //add input to state and validate, adds errors to state
  const onInput = async (e) => {
    const newUserInput = { ...userInput };
    newUserInput[e.target.id] = e.target.value;
    setUserInput(newUserInput);

    const _joiInstance = Joi.object(schema);

    try {
      await _joiInstance.validateAsync(userInput);
      setErrors(undefined);
    } catch (e) {
      const newErrors = {};
      e.details.forEach((error) => {
        newErrors[error.context.key] = error.message;
      });

      setErrors(newErrors);
    }
  };

  const loginUser = async (userInput) => {
    try {
      const { data } = await axios.post(
        "http://localhost:6001/login",
        userInput
      );
      console.log(data);
      if (data.status) {
        dispatch(setMessage("Login sucessful"));
        localStorage.setItem("token", data.token);
        dispatch(setWindow(2));
      } else if (data.reason === "user/password combo was not found") {
        dispatch(setMessage("User not found, try again"));
      }
    } catch (error) {}
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (token) {
      dispatch(setMessage("Already logged in"));
    }
    if (typeof errors === "undefined") {
      loginUser(userInput);
    } else {
      dispatch(setMessage("Email and Password are Incorrect! Try Again"));
    }
  };
  //check if already logged in

  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <form onInput={onInput} onSubmit={onSubmit}>
          <div className="inputContainer">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" autoComplete="email" />
            <p>{errors && errors.email}</p>
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <p>{errors && errors.password}</p>
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
