import axios from "axios";
import { store } from "../../redux/store";
import { setRankedPodcasts } from "../../redux/statsSlice";
import { url} from "../../config";

export const getTopPodcasts = async () => {
  const state = store.getState();
  const token = state.library.token;
  try {
    const { data } = await axios.get(`${url}/plays/get/5`, {
      headers: {
        token: token,
      },
    });

    if (data.data) {
      store.dispatch(setRankedPodcasts(data.data));
    }
  } catch (e) {
    console.log(e);
  }
};
