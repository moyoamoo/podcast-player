import React, { useState } from "react";
import "../CSS/login.scss";
import { setWindow } from "../../redux/librarySlice";
import { useDispatch } from "react-redux";
import FormBtn from "./FormBtn";
import FormInput from "./FormInput";
import { onFormSubmit } from "../../validation/formSubmit";
import { onFormInput } from "../../validation/formInput";
import { signUpSchema } from "../../validation/joiSchemas";

const SignUp = () => {
  const [userInput, setUserInput] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const callback = () => {
    dispatch(setWindow(1));
  };

  return (
    <>
      <div className="accountForm signUp">
        <h2>Create an Account</h2>
        <form
          onInput={(e) => {
            onFormInput(e, signUpSchema, userInput, setUserInput, setErrors);
          }}
          onSubmit={(e) => {
            onFormSubmit(e, adddNewUser, func, userInput);
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
            func={callback}
            text="Already have an acoount?"
            className="linkContainer"
          />
          <FormBtn type="submit" className="submitBtn" text="Sign Up" />
        </form>
      </div>
    </>
  );
};

export default SignUp;
