import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectListened, setMostListened } from "../../redux/statsSlice";
import { selectPodcastsSeries } from "../../redux/podcastSlice";
import { getMostSearchedData } from "../../apiRequest";
import DiscoverPodcast from "./DiscoverPodcast";
import { rankList } from "../utils";
import "../CSS/stats.scss";

const Discover = () => {
  const dispatch = useDispatch();
  const listened = useSelector(selectListened);
  const podcasts = useSelector(selectPodcastsSeries);
  let topListenedUuid;
  let mostListenedPodcasts;

  useEffect(() => {
    if (listened.length > 0) {
      const sortedListenedTotal = rankList(listened);
      dispatch(setMostListened(sortedListenedTotal));

      if (Object.keys(sortedListenedTotal).length >= 5) {
        topListenedUuid = Object.keys(sortedListenedTotal).slice(0, 5);
      } else {
        topListenedUuid = Object.keys(sortedListenedTotal);
      }
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
          <div className="validation">No previous Listens</div>
        )}
      </div>
    </div>
  );
};

export default Discover;
