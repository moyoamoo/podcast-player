import axios from "axios";
import { store } from "../../redux/store";
import {
  storeApiData,
  storeAdditionalApiData,
  storeEpisodeLength,
  appendApiData,
  sortEpisodeOrder,
  storeLibrary,
  appendApiDataSearch,
  addTopPodcasts,
  addNewEpisodes,
} from "../../redux/podcastSlice"
import { setMessage } from "../../redux/librarySlice";
import { url } from "../../config";
import {addSearchTerm} from "../Discover/addSearchTerm"

const state = store.getState();
const token = state.library.token;

///search request
export const getPodcastData = async (
  searchTerm,
  order,
  page,
  storeDestination
) => {

  //set sort order
  if (order === "1") {
    order = "OLDEST";
  } else {
    order = "LATEST";
  }

  //check search term is not empty 
  if (typeof searchTerm === "undefined") {
    store.dispatch(setMessage("Please enter a search term"));
    return;
  }

  try {
    //api call
    const { data } = await axios.get(`${url}/search`, {
      headers: {
        searchTerm: searchTerm,
        page: page,
        order: order,
      },
    });

    //if there is no data 
    if (!data.data) {
      store.dispatch(setMessage(`Search Results Unavailable`));
      return;
    }

    //if there are no search results 
    if (data.data.searchForTerm.podcastSeries.length === 0) {
      store.dispatch(
        setMessage(`No results found for ${searchTerm}, try again!`)
      );
      return;
    }

    //if logged in save results 
    if (token) {
      addSearchTerm(searchTerm);
    }

    //place in store 
    switch (storeDestination) {
      case "search":
        store.dispatch(storeApiData(data.data));
        break;
      case "search":
        store.dispatch(appendApiDataSearch(data.data));
        break;

      default:
        break;
    }
  } catch (error) {
    store.dispatch(setMessage("Podcast Search Unavailable"));
  }
};