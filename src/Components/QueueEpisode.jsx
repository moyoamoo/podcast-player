import { useState } from "react";
import { getEpisode, removeFromQueue } from "../redux/playerSlice";
import { FaPlay } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { TbGridDots } from "react-icons/tb";

import EpisodeDate from "./EpisodeDate";
import EpisodeName from "./EpisodeName";
import QueueBtn from "./QueueBtn";
import EpisodeDescription from "./EpisodeDescription";
import ShowDescriptionBtn from "./ShowDescriptionBtn";

const QueueEpisode = ({ episode }) => {
  const [showDescription, setDescription] = useState(false);

  const toggleDescription = () => {
    setDescription(!showDescription);
  };

  return (
    <>
      <div className="episodeContainer queueContainer">
        <TbGridDots />

        <div>
          <div className="epHeader">
            <div>
              <EpisodeDate date={episode.datePublished} />
              <EpisodeName name={episode.name} />
            </div>
            <QueueBtn icon={<FaPlay />} func={getEpisode(episode)} />
          </div>
          <div className="btnContainer">
            <ShowDescriptionBtn
              showDescription={showDescription}
              toggleDescription={toggleDescription}
            />
            <QueueBtn
              icon={<FaTrash />}
              func={removeFromQueue(episode)}
              className="queueDeleteBtn"
            />
          </div>
          <EpisodeDescription
            description={episode.description}
            showDescription={showDescription}
          />
        </div>
      </div>
    </>
  );
};

export default QueueEpisode;
