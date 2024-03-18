import { useState } from "react";

import EpisodeDate from "./EpisodeDate";
import EpisodeName from "./EpisodeName";
import EpisodePlayBtn from "./EpisodePlayBtn";
import EpisodeQueueBtn from "./EpisodeQueueBtn";
import ShowDescriptionBtn from "./ShowDescriptionBtn";
import EpisodeDescription from "./EpisodeDescription";

const Episode = ({ episode, podcast }) => {
  const [showDescription, setDescription] = useState(false);
  const toggleDescription = () => {
    setDescription(!showDescription);
  };

  const { name: podcastName, uuid: podcastUuid, imageUrl } = podcast;
  const episodePod = {
    podcastName,
    podcastUuid,
    imageUrl,
    ...episode,
  };

  return (
    <div className="episodeContainer">
      <div className="epHeader">
        <div>
          <EpisodeDate date={episode.datePublished} />
          <EpisodeName name={episode.name} />
        </div>
        <EpisodePlayBtn episodePod={episodePod} />
      </div>
      <div className="btnContainer">
        <ShowDescriptionBtn
          showDescription={showDescription}
          toggleDescription={toggleDescription}
        />

        <EpisodeQueueBtn episodePod={episodePod} />
      </div>
      <EpisodeDescription
        description={episode.description}
        showDescription={showDescription}
      />
    </div>
  );
};

export default Episode;
