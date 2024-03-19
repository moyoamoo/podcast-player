import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFavouriteGenres,
  selectGenres,
  selectListened,
  setFavouriteGenres,
  setMostListened,
} from "../../redux/statsSlice";
import { selectPodcastsSeries } from "../../redux/podcastSlice";
import { getPodcastByUuid } from "../../apiRequest";
import DiscoverPodcast from "./DiscoverPodcast";
import { formatGenres, rankList } from "../utils";
import "../CSS/stats.scss";

const Discover = () => {
  const dispatch = useDispatch();
  const listened = useSelector(selectListened);
  const podcasts = useSelector(selectPodcastsSeries);
  const genres = useSelector(selectGenres);
  const favGenres = useSelector(selectFavouriteGenres)

  let topListenedUuid;
  let mostListenedPodcasts;
  let topGenres;

  useEffect(() => {
    if (genres.length > 0) {
      const formattedGenres = formatGenres(genres);
      console.log(formattedGenres)
      const sortedGenres = rankList(formattedGenres);
      console.log(sortedGenres)
      dispatch(setFavouriteGenres(sortedGenres));

      if (Object.keys(sortedGenres).length >= 10) {
        topGenres = Object.keys(sortedGenres).slice(0, 10);
        dispatch(setFavouriteGenres(topGenres));
      } else {
        topGenres = Object.keys(sortedGenres);
        dispatch(setFavouriteGenres(topGenres));
      }
    }

    if (listened.length > 0) {
      const sortedListenedTotal = rankList(listened);
      dispatch(setMostListened(sortedListenedTotal));

      if (Object.keys(sortedListenedTotal).length >= 5) {
        topListenedUuid = Object.keys(sortedListenedTotal).slice(0, 5);
      } else {
        topListenedUuid = Object.keys(sortedListenedTotal);
      }
      topListenedUuid.forEach((uuid) => {
        getPodcastByUuid(uuid, 2, 1, "appendSearch");
      });
    }
  }, [listened, genres]);

  mostListenedPodcasts = podcasts.filter((podcast) => {
    if (podcast.search) {
      return true;
    }
  });

  console.log(topGenres)
  return (
    <div>
      <h2>Most Listened</h2>
      <div className="mostListened">
        {mostListenedPodcasts.length > 0 ? (
          mostListenedPodcasts.map((podcast) => {
            return <DiscoverPodcast key={podcast.uuid} podcast={podcast} />;
          })
        ) : (
          <div className="validation">No previous Listens</div>
        )}
      </div>
      9
      <div>
      
        {favGenres && favGenres.map((genre) => {
          return (
            <p key={genre} className={genre.replaceAll(" ", "_") + " genre"}>
              {genre}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Discover;
