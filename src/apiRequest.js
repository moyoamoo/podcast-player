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

const endPoint = "https://api.taddy.org";
const userID = "1098";
const apiKey =
  "xxx1f294e69b341b027256c07eff203bbc5b4ca73be67a8f8f8751fdfeb3fa8412948f7a07664e77b3e6585d9109aedb3c88a";

///search request
export const getPodcastData = async (searchTerm, page) => {
  // if (!searchTerm) {
  //   store.dispatch(setEmptySearch(true));
  //   return;
  // // }
  // const dataFromDisk = JSON.parse(localStorage.getItem("getPodcastData"));
  // if (dataFromDisk) {
  //   store.dispatch(storeApiData(dataFromDisk));
  //   return;
  // }

  try {
    const { data } = await axios.post(
      endPoint,
      {
        query: `{
            searchForTerm(term:"${searchTerm}", filterForTypes:PODCASTSERIES, searchResultsBoostType:BOOST_POPULARITY_A_LOT, isSafeMode:true ){
              searchId
              podcastSeries{
                genres
                uuid
                name
                hash
                childrenHash
                description
                imageUrl
                episodes(sortOrder:LATEST, page: ${page}, limitPerPage: 10){
                    uuid
                    name
                    description
                    datePublished
                    audioUrl
                  }
              }
            }
          }`,
      },
      {
        headers: {
          "X-USER-ID": userID,
          "X-API-Key": apiKey,
        },
      }
    );
    store.dispatch(setEmptySearch(false));
    store.dispatch(storeApiData(data.data));
    localStorage.setItem("getPodcastData", JSON.stringify(data.data));
  } catch (error) {
    console.log(error);
  }
};

//search podcast by unique id
export const getPodcastByUuid = async (uuid, order, page, storeDestination) => {
  if (order === "1") {
    order = "OLDEST";
  } else {
    order = "LATEST";
  }
  try {
    const { data } = await axios.post(
      endPoint,
      {
        query: `{
          getPodcastSeries(uuid: "${uuid}"){
            uuid
            genres
            name
            hash
            childrenHash
            description
            imageUrl
            episodes(sortOrder: ${order}, page:${page}, limitPerPage:10){
            name 
            uuid
            description
            audioUrl
            datePublished
           }
          }
        }`,
      },
      {
        headers: {
          "X-USER-ID": userID,
          "X-API-Key": apiKey,
        },
      }
    );

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
