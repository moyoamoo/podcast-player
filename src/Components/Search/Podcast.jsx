import "../css/podcast.scss";
import { Link } from "react-router-dom";
import PodcastImage from "./PodcastImage";
import SubscribeBtn from "./SubscribeBtn";
import PodcastName from "./PodcastName";

const Podcast = ({ podcast }) => {
  return (
    <>
      <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
        <div className="podcastContainer">
          <div className="podcastHeading">
            <PodcastImage podcast={podcast} />
            <div className="subscribe">
              <PodcastName name={podcast.name} />
              <SubscribeBtn podcast={podcast} />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Podcast;
