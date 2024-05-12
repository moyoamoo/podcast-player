import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  setMessage,
  setWindow,
  selectEmail,
  selectToken,
  setEmail,
  setScreen,
} from "../../redux/librarySlice";
import { changeAccDetails } from "../../apiRequests/Account/changeAccountDetails";
import { passwordSchema } from "../../validation/joiSchemas";
import Joi from "joi";
import { Navigate } from "react-router-dom";
//dynamic imports

const ChangePassword = () => {
  const email = useSelector(selectEmail);
  const [userInput, setUserInput] = useState({ email });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  //validation schema

  const onSubmit = (e) => {
    e.preventDefault();
    if (typeof errors === "undefined") {
      changeAccDetails({ password: userInput.password });
    } else {
      dispatch(setMessage("Email and Password are Invalid! Try Again"));
    }
  };
  //add input to state and validate, adds errors to state
  const onInput = async (e) => {
    const newUserInput = { ...userInput, [e.target.id]: e.target.value };
    setUserInput(newUserInput);
    const _joiInstance = Joi.object(passwordSchema);

    try {
      await _joiInstance.validateAsync(newUserInput);
      setErrors(undefined);
    } catch (e) {
      const newErrors = {};
      e.details.forEach((error) => {
        newErrors[error.context.key] = error.message;
      });

      setErrors(newErrors);
      console.log(userInput);
    }
  };

  return (
    <>
      <main>
        <button
          onClick={() => {
            dispatch(setScreen(0));
          }}
        >
          Change Email
        </button>
        <div className="accountForm">
          <h2>Change Password</h2>
          <form onInput={onInput} onSubmit={onSubmit}>
            <div className="inputContainer">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={userInput.email}
                readOnly={true}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="password">New Password</label>
              <input type="password" name="password" id="password" />
              <p>{errors && errors.password}</p>
            </div>

            <div className="inputContainer">
              <label htmlFor="repeatPassword">Confirm Password</label>
              <input type="password" name="password" id="repeatPassword" />
              <p>{errors && errors.repeatPassword}</p>
            </div>
            <button className="submitBtn" type="submit">
              Change Account Details
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default ChangePassword;
