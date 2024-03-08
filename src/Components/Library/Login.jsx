import React, { useState } from "react";
import "../CSS/login.scss";
import { selectUser, setLoggedIn, setMessage, setWindow} from "../../redux/librarySlice";
import { store } from "../../redux/store";
import sha256 from "sha256";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [userInput, setUserInput] = useState({});
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const onInput = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const hashedPassword = sha256(userInput.password + "ZhmyyeQaVRwu7wf")

    if (user.password === hashedPassword){
        dispatch(setMessage("Password Correct"))
        dispatch(setWindow(2))
        dispatch(setLoggedIn())
    } else {
        dispatch(setMessage("Email and Password are Incorrect! Try Again"))
    }

  };

  return (
 <>
        <h1>Login</h1>
        <form onInput={onInput} onSubmit={onSubmit}>
         <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <button>Login</button>
          </div>
        </form>
 </>
  );
};

export default Login;
