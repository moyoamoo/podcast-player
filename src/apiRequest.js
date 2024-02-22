import axios from "axios";
import { store } from "./redux/store";
import { storeApiData } from "./redux/podcastSlice";

const endPoint = "https://api.taddy.org";
const userID = "1052";
const apiKey =
  "xxxd2949a554bfb15d5e80dbd8a3c0f7e59832df65460dcdd7979a94a4d7443f424abd2a60ff927fc1ec19fca7b842fd2d7d8";

export const getPodcastData = async () => {
  const dataFromDisk = localStorage.getItem("getPodcastData");
  console.log(JSON.parse(dataFromDisk))
  if (dataFromDisk) {
    store.dispatch(storeApiData(JSON.parse(dataFromDisk)));
    return;
  }

  try {
    const { data } = await axios.post(
      endPoint,
      {
        query: `{
            searchForTerm(term:"This American Life", filterForTypes:PODCASTSERIES){
              searchId
              podcastSeries{
                uuid
                name
                description
                imageUrl
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
