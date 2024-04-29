import React, { useEffect, useState } from "react";
import { selectRankedPodcasts } from "../../redux/statsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectPodcastsSeries } from "../../redux/podcastSlice";
import { clearApiData } from "../../redux/podcastSlice";
import { getPodcastByUuid } from "../../apiRequest";
import TopPodcast from "./TopPodcast";

const TopPodcasts = () => {
  const dispatch = useDispatch();
  const rankedPodcasts = useSelector(selectRankedPodcasts);
  const podcasts = useSelector(selectPodcastsSeries);
  const [topPodcasts, setTopPodcasts] = useState([])

  const displayTopPodcasts = () => {
    let _topPodcasts = podcasts.filter((podcast) => podcast.topPodcast);
    setTopPodcasts(_topPodcasts)

  };

  useEffect(() => {
    dispatch(clearApiData());
    if (rankedPodcasts) {
      Object.keys(rankedPodcasts).forEach((uuid) => {
        getPodcastByUuid(uuid, 2, 1, "appendTopPodcasts");
      });
    }
  }, []);

  useEffect(() => {
    displayTopPodcasts();

  }, [podcasts]);

  return (
    <>
   
      <h3 className="discoverHeaders">Top Listened </h3>
      <div className="mostListened">
        {topPodcasts.length
          ? topPodcasts.map((podcast) => {
              return (
                <TopPodcast podcast={podcast} key={podcast.uuid + 1} />
              );
            })
          : null}
      </div>
    </>
  );
};

export default TopPodcasts;
