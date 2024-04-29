import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectRankedPodcasts } from "../../redux/statsSlice";

const TopPodcast = ({ podcast }) => {

  const rankedPodcasts = useSelector(selectRankedPodcasts);
  let plays;
  Object.keys(rankedPodcasts).forEach((uuid) => {
    if (uuid === podcast.uuid) {
      plays = rankedPodcasts[uuid];
    }
  });

  return (
    <>
      <div className="listenedContainer">
        <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
          <img
            loading="lazy"
            className="discoverPodcast"
            src={podcast.imageUrl}
            onError={(e) => {
              e.target.src = defaultImage;
              e.onerror = null;
            }}
          />
          <p className="plays"> Plays {plays}</p>
        </Link>
      </div>
    </>
  );
};

export default TopPodcast;
