import { changeAccDetails } from "../apiRequests/Account/changeAccountDetails";
import { store } from "../redux/store";
import { setMessage } from "../redux/librarySlice";

export const onFormSubmit = (e, errors, userInput) => {
  e.preventDefault();
  if (typeof errors === "undefined") {
    changeAccDetails(userInput);
  } else {
    console.log(errors);
    store.dispatch(setMessage("Email and Password are Invalid! Try Again"));
  }
};
