import axios from "axios";
import { store } from "../../redux/store";
import { setPreviousSearches } from "../../redux/statsSlice";
import { url } from "../../config";

export const getRecentSearches = async () => {
  const state = store.getState();
  const token = state.library.token;
  try {
    const { data } = await axios.get(
      `${url}/search_term/get/5`,
      {
        headers: {
          token: token,
        },
      }
    );

    if (data.data) {
      store.dispatch(setPreviousSearches(data.data));
    }
  } catch (e) {
    console.log(e);
  }
};
