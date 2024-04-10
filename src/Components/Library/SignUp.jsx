import React, { useState } from "react";
import Joi from "joi";
import axios from "axios";
import "../CSS/login.scss";
import { setWindow, setMessage } from "../../redux/librarySlice";
import { store } from "../../redux/store";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [userInput, setUserInput] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

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

  //add new user, send userInput to api
  const addNewUser = async (userInput) => {
    try {
      const { data } = await axios.post(
        "http://localhost:6001/user/add",
        userInput
      );

      if (data.status) {
        dispatch(setMessage("Account Created"));
        localStorage.setItem("token", data.token);
        dispatch(setWindow(2));
      } else if (data.reason === "Duplicate account") {
        dispatch(setMessage("Account already exists! Try agaiin"));
      } else {
        dispatch(setMessage("Account not created! Try again"));
      }
    } catch (e) {
      dispatch(setMessage("Unable to connect to create account, try again!"));
    }
  };

  //on submit, if no errors make api call
  const onSubmit = (e) => {
    e.preventDefault();
    if (typeof errors === "undefined") {
      addNewUser(userInput);
    } else {
      dispatch(setMessage("Invalid password and/or email, try again"));
    }

  };
 
  return (
    <>
      <div className="login signUp">
        <h1>Create an Account</h1>
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
                dispatch(setWindow(1));
              }}
            >
              Already have account?
            </button>
          </div>
          <button className="submit" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
