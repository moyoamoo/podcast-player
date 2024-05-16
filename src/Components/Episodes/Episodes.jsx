import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Episode from "../Episode/Episode";
import "../CSS/episodes.scss";
import ShowMoreBtn from "./ShowMoreBtn";
import { getPodcastByUuid } from "../../apiRequests/PodcastData/getPodcastByUuid";
import { useSelector } from "react-redux";
import { selectPodcast } from "../../redux/podcastSlice";
import { formatGenres } from "../utils";
import PodcastDetails from "./PodcastDetails";
import Spinner from "../Spinner";

const Episodes = () => {
  const { id } = useParams();
  const podcast = useSelector(selectPodcast(id));
  let formattedGenres;
  console.log(id);

  useEffect(() => {
    if (!podcast) {
      getPodcastByUuid(id, 2, 1, "append");
    }
  }, []);



  const callback = (sortBy, page, type) => {
    getPodcastByUuid(podcast.uuid, sortBy, page, type);
  };

  
  return (
    <>
      {podcast ? (
        <>
          <PodcastDetails podcast={podcast} />
          <div className="podContainer">
            {podcast.episodes &&
              podcast.episodes.map((episode) => {
                return (
                  <Episode
                    episode={episode}
                    podcast={podcast}
                    key={episode.uuid}
                  />
                );
              })}
          </div>

          <div className="showMoreContainer">
            <ShowMoreBtn
              callback={callback}
              totalEpisodesCount={podcast.totalEpisodesCount}
            />
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Episodes;
