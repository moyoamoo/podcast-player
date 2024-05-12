import axios from "axios";
import { store } from "../../redux/store";
import {
  setMessage,
  setToken,
  setEmail,
  setWindow,
} from "../../redux/librarySlice";

export const addNewUser = async (userInput) => {
  try {
    const { data } = await axios.post(
      "http://localhost:6001/user/add",
      userInput
    );
    console.log(data);
    if (data.status && data.reason) {
      store.dispatch(setMessage("Account already exists! Try agaiin"));
    } else if (data.status) {
      store.dispatch(setMessage("Account Created"));
      store.dispatch(setToken(data.token));
      store.dispatch(setEmail(data.email));
      store.dispatch(setWindow(2));
    } else {
      store.dispatch(setMessage("Account not created! Try again"));
    }
  } catch (e) {
    console.log(e);
    store.dispatch(
      setMessage("Unable to connect to create account, try again!")
    );
  }
};
