import axios from "axios";
import { store } from "../../redux/store";
import { setMessage, setEmail } from "../../redux/librarySlice";

export const changeAccDetails = async (userInput) => {
  const state = store.getState();
  const token = state.library.token;


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
