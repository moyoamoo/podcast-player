import React from "react";
import { useSelector } from "react-redux";
import {
  selectEmptySearch,
  selectPodcastsSeries,
} from "../../redux/podcastSlice";
import Spinner from "../Spinner";
import Podcast from "./Podcast";
import ShowMoreBtn from "../Episodes/ShowMoreBtn";
import "../CSS/libraryPodcasts.scss";

const PodcastResults = () => {
  const podcastSeries = useSelector(selectPodcastsSeries);
  const emptySearch = useSelector(selectEmptySearch);
  console.log(emptySearch);

  let filteredPodcastSeries;

  filteredPodcastSeries = podcastSeries.filter((podcast) => {
    if (!podcast.library === true) {
      return true;
    }
  });

  // return emptySearch === undefined? (
  //   <div className="validation">
  //     <p>Enter a podcast name to search </p>
  //   </div>
  // ) : !podcastSeries ? (
  //   <Spinner />
  // ) : filteredPodcastSeries.length === 0 ? (
  //   <div className="validation">
  //     <p>No results found</p>
  //   </div>
  // ) : (
  return (
    <>
      {filteredPodcastSeries.map((podcast) => {
        return <Podcast podcast={podcast} key={podcast.uuid} />;
      })}
      <ShowMoreBtn/>
    </>
  );
};

export default PodcastResults;
