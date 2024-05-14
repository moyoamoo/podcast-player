import axios from "axios";
import { store } from "../../redux/store";
import {
  setMessage,
  setToken,
  setEmail,
  setWindow,
} from "../../redux/librarySlice";
import { url } from "../../config";

export const loginUser = async (userInput) => {
  try {
    const { data } = await axios.post(`${url}/login`, userInput);
    console.log(data);
    if (data.status) {
      store.dispatch(setMessage("Login sucessful"));
      store.dispatch(setToken(data.token));
      store.dispatch(setEmail(data.email));
      store.dispatch(setWindow(2));
    } else if (data.reason === "user/password combo was not found") {
      store.dispatch(setMessage("User not found, try again"));
    } else if (!data.status) {
      store.dispatch(setMessage("Email and/or Password Incorrect!"));
    }
  } catch (e) {
    store.dispatch(setMessage("Login unsucessful, try again!"));
    console.log(e);
  }
};
