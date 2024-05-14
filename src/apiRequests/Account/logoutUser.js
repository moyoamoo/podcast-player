import axios from "axios";
import { store } from "../../redux/store";
import { setToken, setMessage } from "../../redux/librarySlice";

export const logout = async () => {
  const state = store.getState();
  const token = state.library.token;

  try {
    const { data } = await axios.delete(`${url}/logout`, {
      headers: {
        token: token,
      },
    });

    if (data.status === 1) {
      store.dispatch(setToken(undefined));
      store.dispatch(setMessage("Logout Successful"));
    }
  } catch (e) {
    store.dispatch(setMessage("Logout Unseccessful"));
  }
};
