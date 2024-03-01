import React, { useState } from "react";
import "../CSS/login.scss";
import { setNewUser } from "../../redux/librarySlice";
import { store } from "../../redux/store";

const SignUp = () => {
  const [userInput, setUserInput] = useState({});

  const onInput = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) =>{
    e.preventDefault();
    store.dispatch(setNewUser(userInput))
  }
  console.log(userInput);
  return (
    <form onInput={onInput} onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUp;
