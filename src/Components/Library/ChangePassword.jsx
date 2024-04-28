import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setMessage } from "../../redux/librarySlice";
import axios from "axios";
import Joi from "joi";
const ChangePassword = () => {
  const [userInput, setUserInput] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = localStorage.getItem("token");

  const changeAccDetails = async () => {
    try {
      const { data } = await axios.patch(
        "http://localhost:6001/user/update",
        userInput,
        {
          headers: {
            token,
          },
        }
      );
      console.log(data);
      if(data.status){
        dispatch(setMessage("Account Details Changed"))
      }
    } catch (e) {
      console.log(e);
    }
  };
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
      changeAccDetails(userInput);
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
        <div className="login">
          <h2>Change Password</h2>
          <form onInput={onInput} onSubmit={onSubmit}>
            <div className="inputContainer">
              <label htmlFor="email"> New Email or Existing Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
              />
              <p>{errors && errors.email}</p>
            </div>
            <div className="inputContainer">
              <label htmlFor="password">
                New Password or Existing Password
              </label>
              <input type="password" name="password" id="password" />
              <p>{errors && errors.password}</p>
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

export default ChangePassword;
