import Episode from "./Episodes";

const PodcastEpisodes = ({ podcast }) => {
  return (
    <>
      {podcast.episodes.map((episode) => {
        return (
          <Episode episode={episode} podcast={podcast} key={episode.uuid} />
        );
      })}
    </>
  );
};

export default PodcastEpisodes;
