import "../css/podcast.scss";
import { Link } from "react-router-dom";
import PodcastImage from "./PodcastImage";
import SubscribeBtn from "./SubscribeBtn";
import PodcastName from "./PodcastName";

const Podcast = ({ podcast }) => {
  return (
    <>
      <div className="podcastContainer">
        <PodcastName name={podcast.name} />
        <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
          <PodcastImage podcast={podcast} />
        </Link>

        <div className="podcastHeading">
          <SubscribeBtn podcast={podcast} />
        </div>
      </div>
    </>
  );
};

export default Podcast;
