import axios from "axios";
import { store } from "../../redux/store";
import { url } from "../../config";

export const addGenres = async (queue, queueIndex) => {
  const state = store.getState();
  const token = state.library.token;

  try {
    const { data } = await axios.post(
      `${url}/genres/add`,
      { genres: queue[queueIndex].genres },
      {
        headers: {
          token,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
};
