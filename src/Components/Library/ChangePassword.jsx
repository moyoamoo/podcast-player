import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectEmail, setScreen } from "../../redux/librarySlice";
import { onFormSubmit } from "../../validation/formSubmit";
import { onFormInput } from "../../validation/formInput";
import FormBtn from "./FormBtn";
import FormInput from "./FormInput";
import { passwordSchema } from "../../validation/joiSchemas";
import { changeAccDetails } from "../../apiRequests/Account/changeAccountDetails";

const ChangePassword = () => {
  const email = useSelector(selectEmail);
  const [userInput, setUserInput] = useState({ email });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const callback = () => {
    dispatch(setScreen(0));
  };

  return (
    <>
      <main>
        <FormBtn
          type="button"
          className="switchBtn"
          text="Change Email"
          func={callback}
        />

        <div className="accountForm">
          <h2>Change Password</h2>
          <form
            onInput={(e) => {
              onFormInput(
                e,
                passwordSchema,
                userInput,
                setUserInput,
                setErrors
              );
            }}
            onSubmit={(e) => {
              onFormSubmit(e, errors, changeAccDetails, {
                password: userInput.repeatPassword,
              });
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
              type="password"
              text="New Password"
              name="password"
              errors={errors}
            />
            <FormInput
              className="inputContainer"
              type="password"
              text="Repeat Password"
              name="repeatPassword"
              errors={errors}
            />
            <FormBtn
              type="submit"
              className="submitBtn"
              text=" Change Account Details"
            />
          </form>
        </div>
      </main>
    </>
  );
};

export default ChangePassword;
