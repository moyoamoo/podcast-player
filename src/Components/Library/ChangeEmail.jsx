import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  setMessage,
  selectEmail,
  selectToken,
  setEmail,
  setScreen
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
    password: Joi.string().min(4).required(),
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (typeof errors === "undefined") {
      changeAccDetails(userInput.email);
    } else {
      dispatch(setMessage("Email and Password are Invalid! Try Again"));
    }
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
  return (
    <>
      <main>
        <button
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
                defaultValue={userInput.email}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="newEmail">New Email</label>
              <input
                type="email"
                name="email"
                id="newEmail"
                defaultValue={userInput.email}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="confirmEmail">Email</label>
              <input
                type="email"
                name="email"
                id="confirmEmail"
                defaultValue={userInput.email}
              />
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
