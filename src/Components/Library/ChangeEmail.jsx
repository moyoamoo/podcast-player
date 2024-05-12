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

const ChangeEmail = () => {
  const email = useSelector(selectEmail);
  const [userInput, setUserInput] = useState({ email });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  //validation schema
  const schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    repeatEmail: Joi.ref("email"),
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (typeof errors === "undefined") {
      changeAccDetails({ email: userInput.email });
    } else {
      dispatch(setMessage("Email and Password are Invalid! Try Again"));
    }
  };
  //add input to state and validate, adds errors to state

  const onInput = async (e) => {
    const newUserInput = { ...userInput, [e.target.id]: e.target.value };
    setUserInput(newUserInput);
    const _joiInstance = Joi.object(schema);

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
        <button className="switchBtn"
          onClick={() => {
            dispatch(setScreen(1));
          }}
        >
          Change Password
        </button>
        <div className="accountForm">
          <h2>Change Email</h2>
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
              <label htmlFor="newEmail">New Email</label>
              <input type="email" name="email" id="newEmail" />
            </div>

            <div className="inputContainer">
              <label htmlFor="confirmEmail">Email</label>
              <input type="email" name="email" id="confirmEmail" />
            </div>

            <button className="submit" type="submit">
              Change Account Details
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default ChangeEmail;
