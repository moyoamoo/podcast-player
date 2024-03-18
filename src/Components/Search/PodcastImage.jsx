const PodcastImage = ({podcast}) => {
  return (
    <>
      <img
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
