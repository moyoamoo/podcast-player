import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectEmail, setScreen } from "../../redux/librarySlice";
import FormBtn from "./FormBtn";
import FormInput from "./FormInput";
import { onFormSubmit } from "../../validation/formSubmit";
import { onFormInput } from "../../validation/formInput";

const ChangeEmail = () => {
  const email = useSelector(selectEmail);
  const [userInput, setUserInput] = useState({ email });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

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
          <form
            onInput={(e) => {
              onFormInput(e, userInput, setUserInput, setErrors);
            }}
            onSubmit={(e) => {
              onFormSubmit(e, errors, { email: userInput.repeatEmail });
            }}
          >
            <FormInput
              className="inputContainer"
              type="email"
              name="oldEmail"
              value={email}
              text="Current Email"
            />
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
            <FormBtn
              type="submit"
              className="submitBtn"
              text=" Change Email Details"
            />
          </form>
        </div>
      </main>
    </>
  );
};

export default ChangeEmail;
