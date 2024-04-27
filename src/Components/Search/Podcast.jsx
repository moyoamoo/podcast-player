import "../css/podcast.scss";
import { Link } from "react-router-dom";
import PodcastImage from "./PodcastImage";
import SubscribeBtn from "./SubscribeBtn";
import PodcastName from "./PodcastName";

const Podcast = ({ podcast }) => {
  return (
    <>
      <div className="podcastContainer">
        <div className="podcastHeading">
          <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
            <PodcastImage podcast={podcast} />
          </Link>
          <div className="subscribe">
            <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
              <PodcastName name={podcast.name} />
            </Link>
            <SubscribeBtn podcast={podcast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Podcast;
