import axios from "axios";
import { store } from "../../redux/store";
import { url } from "../../config";

export const updateServerDuration = async (
  playbackPosition,
  playbackDuration,
  queue,
  queueIndex
) => {
  const state = store.useState();
  const token = state.token.library;
  try {
    const { data } = await axios.post(
      `${url}/listened/add`,
      {
        playbackPosition,
        playbackDuration,
        episodeUuid: queue[queueIndex].uuid,
        podcastUuid: queue[queueIndex].podcastUuid,
      },
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
