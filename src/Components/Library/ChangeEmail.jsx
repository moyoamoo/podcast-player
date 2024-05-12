import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  setMessage,
  selectEmail,
  selectToken,
  setEmail,
  setScreen,
} from "../../redux/librarySlice";
import Joi from "joi";
import { emailSchema } from "../../validation/joiSchemas";
import FormBtn from "./FormBtn";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import FormReadOnlyInput from "./FormReadOnlyInput";

const ChangeEmail = () => {
  const email = useSelector(selectEmail);
  const [userInput, setUserInput] = useState({ email });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const onSubmit = (e) => {
    e.preventDefault();
    if (typeof errors === "undefined") {
      changeAccDetails({ email: userInput.repeatEmail });
    } else {
      dispatch(setMessage("Email and Password are Invalid! Try Again"));
    }
  };
  //add input to state and validate, adds errors to state

  const onInput = async (e) => {
    const newUserInput = { ...userInput, [e.target.id]: e.target.value };
    setUserInput(newUserInput);
    const _joiInstance = Joi.object(emailSchema);

    try {
      await _joiInstance.validateAsync(newUserInput);
      setErrors(undefined);
    } catch (e) {
      const newErrors = {};
      e.details.forEach((error) => {
        newErrors[error.context.key] = error.message;
      });

      setErrors(newErrors);
      console.log(newUserInput);
    }
  };

  const callback = () => {
    dispatch(setScreen(1));
  };

  return (
    <>
      <main>
        <FormBtn
          type="button"
          className="switchBtn"
          text="Change Password"
          func={callback}
        />

        <div className="accountForm">
          <h2>Change Email</h2>
          <form onInput={onInput} onSubmit={onSubmit}>
            <FormReadOnlyInput className="inputContainer" type="email" name="oldEmail" value={email} text="Current Email"/>
            <FormInput
              className="inputContainer"
              type="email"
              text="New Email"
              name="newEmail"
              errors={errors}
            />
            <FormInput
              className="inputContainer"
              type="email"
              text="Repeat Email"
              name="repeatEmail"
              errors={errors}
            />
            <SubmitBtn
              type="submit"
              className="submitBtn"
              text=" Change Account Email"
            />
          </form>
        </div>
      </main>
    </>
  );
};

export default ChangeEmail;
