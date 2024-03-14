import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectListened } from "../redux/statsSlice";
import { selectPodcastsSeries } from "../redux/podcastSlice";
import { appendApiDataSearch, clearApiData } from "../redux/podcastSlice";
import { getMostSearchedData } from "../apiRequest";
import DiscoverPodcast from "./DiscoverPodcast";
import "./CSS/stats.scss";

const Discover = () => {
  const dispatch = useDispatch();
  const listened = useSelector(selectListened);
  const podcasts = useSelector(selectPodcastsSeries);
  let topListenedUuid;
  let mostListenedPodcasts;

  useEffect(() => {
    if (listened.length > 0) {
      let listenedTotal = {};
      listened.forEach((podcast) => {
        if (listenedTotal[podcast]) {
          listenedTotal[podcast] += 1;
        } else {
          listenedTotal[podcast] = 1;
        }
      });
      console.log(listenedTotal);

      const sortedListenedTotal = Object.fromEntries(
        Object.entries(listenedTotal).sort(([, a], [, b]) => b - a)
      );

      if (Object.keys(sortedListenedTotal).length >= 5) {
        topListenedUuid = Object.keys(sortedListenedTotal).slice(0, 5);
      } else {
        topListenedUuid = Object.keys(sortedListenedTotal);
      }
      console.log(topListenedUuid)
      dispatch(clearApiData());
      topListenedUuid.forEach((uuid) => {
        getMostSearchedData(uuid, 1);
      });
    }
  }, [listened]);

  mostListenedPodcasts = podcasts.filter((podcast) => {
    if (podcast.search) {
      return true;
    }
  });

  return (
    <div>
      <h2>Most Listened</h2>
      <div className="mostListened">
        {mostListenedPodcasts ? (
          mostListenedPodcasts.map((podcast) => {
            return <DiscoverPodcast key={podcast.uuid} podcast={podcast} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Discover;
