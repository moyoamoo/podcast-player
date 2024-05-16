import axios from "axios";
import { store } from "../../redux/store";
import {
  storeAdditionalApiData,
  storeEpisodeLength,
  appendApiData,
  sortEpisodeOrder,
  storeLibrary,
  appendApiDataSearch,
  addTopPodcasts,
  addNewEpisodes,
} from "../../redux/podcastSlice";
import { setMessage } from "../../redux/librarySlice";
import { url } from "../../config";

export const getPodcastByUuid = async (uuid, order, page, storeDestination) => {
  if (order === "1") {
    order = "OLDEST";
  } else {
    order = "LATEST";
  }

  try {
    const { data } = await axios.get(`${url}/episodes`, {
      headers: {
        uuid: uuid,
        order: order,
        page: page,
      },
    });

    if (!data.data) {
      console.log("undefined data");
      store.dispatch(setMessage("Podcasts unavilable"));
      return;
    }

    switch (storeDestination) {
      case "append":
        //add to most listened
        store.dispatch(appendApiData(data.data.getPodcastSeries));
        break;
      case "appendSearch":
        //adds to search
        store.dispatch(appendApiDataSearch(data.data.getPodcastSeries));
        break;
      case "sorted":
        //sort select
        store.dispatch(sortEpisodeOrder(data.data.getPodcastSeries));
        break;
      case "showMore":
        store.dispatch(storeAdditionalApiData(data.data.getPodcastSeries));
        store.dispatch(
          storeEpisodeLength(data.data.getPodcastSeries.episodes.length)
        );
        break;
      case "library":
        store.dispatch(storeLibrary(data.data.getPodcastSeries));
        break;

      case "appendTopPodcasts":
        store.dispatch(addTopPodcasts(data.data.getPodcastSeries));
        break;

      case "addNew":
        store.dispatch(addNewEpisodes(data.data.getPodcastSeries));
        break;
      default:
        break;
    }
  } catch (e) {
    console.log(e);
    store.dispatch(setMessage("Episodes Not Available"));
  }
};
