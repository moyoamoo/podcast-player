import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(clearApiData());

    if (rankedPodcasts) {
      Object.keys(rankedPodcasts).forEach((uuid) => {
        getPodcastByUuid(uuid, 2, 1, "appendSearch");
      });
    }
  }, []);
  return (
    <>
     
      <h3 className="discoverHeaders">Top Listened </h3>
      <div className="mostListened">
        {podcasts
          ? podcasts.map((podcast) => {
              return <TopPodcast podcast={podcast} key={podcast.uuid} />;
            })
          : null}
      </div>
    </>
  );
};

export default TopPodcasts;
