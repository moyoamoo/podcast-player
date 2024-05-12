import React, { useState } from "react";
import "../CSS/login.scss";
import { setWindow } from "../../redux/librarySlice";
import { useDispatch } from "react-redux";

import FormBtn from "./FormBtn";
import FormInput from "./FormInput";
import { onLoginSubmit } from "../../validation/formSubmit";
import { onFormInput } from "../../validation/formInput";
import { loginSchema } from "../../validation/joiSchemas";

const Login = () => {
  const [userInput, setUserInput] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const callback = () => {
    dispatch(setWindow(0));
  };
  return (
    <>
      <div className="accountForm">
        <h2>Login</h2>
        <form
          onInput={(e) => {
            onFormInput(e, loginSchema, userInput, setUserInput, setErrors);
          }}
          onSubmit={(e) => {
            onLoginSubmit(e, userInput, errors);
          }}
        >
          <FormInput
            className="inputContainer"
            type="email"
            text="Email"
            name="email"
            errors={errors}
          />
          
          <FormInput
            className="inputContainer"
            type="password"
            text="Password"
            name="password"
            errors={errors}
          />
          <FormBtn
            type="button"
            className="linkContainer"
            text="Don't have an account"
            func={callback}
          />
          <FormBtn type="submit" className="submitBtn" text="Login" />
        </form>
      </div>
    </>
  );
};

export default Login;
