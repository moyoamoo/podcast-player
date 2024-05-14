import axios from "axios";
import { store } from "../../redux/store";
import { setMessage, setEmail } from "../../redux/librarySlice";
import { url } from "../../config";

export const changeAccDetails = async (userInput) => {
  const state = store.getState();
  const token = state.library.token;


  try {
    const { data } = await axios.patch(
      `${url}/user/update`,
      userInput,
      {
        headers: {
          token,
        },
      }
    );
    if (data.status) {
      store.dispatch(setMessage("Account Details Changed"));
      if (userInput.email) {
        store.dispatch(setEmail(userInput.email));
      }
    }
  } catch (e) {
    console.log(e);
    store.dispatch(setMessage("Unable to change account details"));
  }
};
