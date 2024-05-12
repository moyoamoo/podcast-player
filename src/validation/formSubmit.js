import { changeAccDetails } from "../apiRequests/Account/changeAccountDetails";
import { store } from "../redux/store";
import { setMessage } from "../redux/librarySlice";
import { loginUser } from "../apiRequests/Account/loginUser";

export const onFormSubmit = (e, errors, func, userInput) => {
  console.log(func);
  e.preventDefault();
  if (typeof errors === "undefined") {
    func(userInput);
  } else {
    console.log(errors);
    store.dispatch(setMessage("Email and Password are Invalid! Try Again"));
  }
};

export const onLoginSubmit = (e, userInput, errors) => {
  const state = store.getState();
  const token = state.library.token;
  e.preventDefault();
  if (token) {
    store.dispatch(setMessage("Already logged in"));
  }
  if (typeof errors === "undefined") {
    loginUser(userInput);
  } else {
    store.dispatch(setMessage("Email and Password are Incorrect! Try Again"));
  }
};
