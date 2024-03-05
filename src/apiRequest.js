import axios from "axios";
import { store } from "./redux/store";
import {
  storeApiData,
  storeAdditionalApiData,
  storeEpisodeLength,
  appendApiData,
} from "./redux/podcastSlice";

const endPoint = "https://api.taddy.org";
const userID = "1098";
const apiKey =
  "1f294e69b341b027256c07eff203bbc5b4ca73be67a8f8f8751fdfeb3fa8412948f7a07664e77b3e6585d9109aedb3c88a";

export const getPodcastData = async (searchTerm, page) => {
  const dataFromDisk = JSON.parse(localStorage.getItem("getPodcastData"));
  if (dataFromDisk) {
    store.dispatch(storeApiData(dataFromDisk));
    return;
  }

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

    console.log(data);
    store.dispatch(storeApiData(data.data));
    localStorage.setItem("getPodcastData", JSON.stringify(data.data));
  } catch (error) {
    console.log(error);
  }
};

export const getEpisodeData = async (uuid, page) => {
  console.log(uuid, page);
  try {
    const { data } = await axios.post(
      endPoint,
      {
        query: `{
                getPodcastSeries(uuid: "${uuid}"){
                  uuid
                  name
                  hash
                  childrenHash
                  description
                  imageUrl
                  episodes(sortOrder:LATEST, page:${page}, limitPerPage:10){
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
    console.log(data.data);
    store.dispatch(storeAdditionalApiData(data.data));
    store.dispatch(
      storeEpisodeLength(data.data.getPodcastSeries.episodes.length)
    );
  } catch (error) {
    console.log(error);
  }
};

export const getLibraryData = async (uuid, page) => {
  try {
    const { data } = await axios.post(
      endPoint,
      {
        query: `{
                getPodcastSeries(uuid: "${uuid}"){
                  uuid
                  name
                  hash
                  childrenHash
                  description
                  imageUrl
                  episodes(sortOrder:LATEST, page:${page}, limitPerPage:10){
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
    console.log(data.data.getPodcastSeries);
    store.dispatch(appendApiData(data.data.getPodcastSeries));
  } catch (error) {
    console.log(error);
  }
};
