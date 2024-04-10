import axios from "axios";
import { store } from "./redux/store";
import {
  storeApiData,
  storeAdditionalApiData,
  storeEpisodeLength,
  appendApiData,
  sortEpisodeOrder,
  setEmptySearch,
  appendApiDataSearch,
} from "./redux/podcastSlice";

///search request
export const getPodcastData = async (searchTerm, page) => {
  console.log(searchTerm, page);
  try {
    const { data } = await axios.get("http://localhost:6001/search", {
      headers: {
        searchTerm: searchTerm,
        page: page,
      },
    });
    console.log(data);
    store.dispatch(storeApiData(data.data));
    // localStorage.setItem("getPodcastData", JSON.stringify(data.data));
  } catch (error) {
    console.log(error);
  }
}

//search podcast by unique id
export const getPodcastByUuid = async (uuid, order, page, storeDestination) => {
  if (order === "1") {
    order = "OLDEST";
  } else {
    order = "LATEST";
  }

  try {
    const { data } = await axios.get("http://localhost:6001/episodes", {
      headers: {
        uuid: uuid,
        order: order,
        page, page
      },
    });
    console.log(data);
    store.dispatch(storeApiData(data.data));

    if (storeDestination === "append") {
      //add to library
      store.dispatch(appendApiData(data.data.getPodcastSeries));
    } else if (storeDestination === "appendSearch") {
      //add to most listened
      store.dispatch(appendApiDataSearch(data.data.getPodcastSeries));
    } else if (storeDestination === "sorted") {
      //sort select
      store.dispatch(sortEpisodeOrder(data.data.getPodcastSeries));
      //show more button
    } else if (storeDestination === "showMore") {
      store.dispatch(storeAdditionalApiData(data.data));
      store.dispatch(
        storeEpisodeLength(data.data.getPodcastSeries.episodes.length)
      );
    }
  } catch (error) {
    console.log(error);
  }
};
