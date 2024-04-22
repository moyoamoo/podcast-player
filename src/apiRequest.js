import axios from "axios";
import { store } from "./redux/store";
import {
  storeApiData,
  storeAdditionalApiData,
  storeEpisodeLength,
  appendApiData,
  sortEpisodeOrder,
  setEmptySearch,
  saveSearchTerm,
  appendApiDataSearch,
} from "./redux/podcastSlice";

///search request
export const getPodcastData = async (
  searchTerm,
  order,
  page,
  storeDestination
) => {
  if (order === "1") {
    order = "OLDEST";
  } else {
    order = "LATEST";
  }

  if (typeof searchTerm === "undefined") {
    store.dispatch(message("Please enter a search term"));
    return;
  }

  console.log(searchTerm, page);
  try {
    const { data } = await axios.get("http://localhost:6001/search", {
      headers: {
        searchTerm: searchTerm,
        page: page,
        order: order,
      },
    });
    if (typeof data.data == "undefined") {
      console.log("undefined data");
      return;
    }
    if (storeDestination === "search") {
      store.dispatch(storeApiData(data.data));
    } else if (storeDestination === "showMore") {
      store.dispatch(appendApiDataSearch(data.data));
    }

    // localStorage.setItem("getPodcastData", JSON.stringify(data.data));
  } catch (error) {
    console.log(error);
  }
};

//search podcast by unique id
export const getPodcastByUuid = async (uuid, order, page, storeDestination) => {
  console.log(uuid, order, page, storeDestination);
  if (order === "1") {
    order = "OLDEST";
  } else {
    order = "LATEST";
  }

  console.log(uuid, order, page, storeDestination);
  try {
    const { data } = await axios.get("http://localhost:6001/episodes", {
      headers: {
        uuid: uuid,
        order: order,
        page: page,
      },
    });
    console.log(data);

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
