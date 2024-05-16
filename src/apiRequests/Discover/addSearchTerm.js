import { store } from "../../redux/store";
import axios from "axios";
import { url } from "../../config";

export const addSearchTerm = async (searchTerm) => {
  const state = store.getState();
  const token = state.library.token;

  try {
    const { data } = await axios.get(`${url}/search_term/add`, {
      headers: { token: token, searchTerm: searchTerm },
    });
  } catch (e) {
    console.log(e);
  }
};
