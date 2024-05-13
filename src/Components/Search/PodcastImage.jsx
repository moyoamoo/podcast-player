import defaultImage from "../CSS/assets/podcast-icon.jpg";
import placeHolder from "../CSS/assets/placeholder.jpg"

const PodcastImage = ({ podcast }) => {
  return (
    <>
      <img
        loading="lazy"
        src={placeHolder}
        alt={podcast.name}
        onError={(e) => {
          e.target.src = defaultImage;
          e.onerror = null;
        }}
        onLoad={(e) => {
          e.target.src = podcast.imageUrl;
        }}
      />
    </>
  );
};

export default PodcastImage;
