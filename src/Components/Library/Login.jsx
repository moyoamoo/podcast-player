import React, { useState } from "react";
import "../CSS/login.scss";
import {
  selectUser,
  setMessage,
  setWindow,
  selectWindow,
  selectToken,
} from "../../redux/librarySlice";
import { useDispatch, useSelector } from "react-redux";

import Joi from "joi";
import { loginUser } from "../../apiRequests/Account/loginUser";

const Login = () => {
  const [userInput, setUserInput] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const window = useSelector(selectWindow);
  const token = useSelector(selectToken);

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
      <div className="accountForm">
        <h2>Login</h2>
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
          <div className="linkContainer">
            <button
              onClick={() => {
                dispatch(setWindow(0));
              }}
            >
              Don't have an account?
            </button>
          </div>

          <button className="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
