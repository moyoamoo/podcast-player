import { store } from "../../redux/store";
import { setMessage, setToken } from "../../redux/librarySlice";
import axios from "axios";

export const deleteAccount = async () => {
  const state = store.getState();
  const token = state.library.token;
  
  try {
    const { data } = await axios.delete("http://localhost:6001/user/delete", {
      headers: {
        token: token,
      },
    });

    if (data.status) {
      store.dispatch(setMessage("Account Deleted!"));
      store.dispatch(setToken())
    }
  } catch (e) {
    store.dispatch(setMessage("Account could not be deleted, try again!"));
    console.log(e);
  }
};
