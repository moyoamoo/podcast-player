import defaultImage from "../CSS/assets/podcast-icon.jpg"

const PodcastImage = ({ podcast }) => {
  return (
    <>
      <img
        loading="lazy"
        src={podcast.imageUrl}
        alt={podcast.name}
        onError={(e) => {
          e.target.src = defaultImage;
          e.onerror = null;
        }}
      />
    </>
  );
};

export default PodcastImage;
