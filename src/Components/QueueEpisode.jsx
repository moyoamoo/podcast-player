


const Episode = ({ episode, podcast }) => {
  const [showDescription, setDescription] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inQueue, setQueue] = useState(false);
  const queue = useSelector(selectQueue);
  const toggleDescription = () => {
    setDescription(!showDescription);
  };
  console.log(queue[0].uuid);

  return (
    <>
      <div className="episodeContainer">
        <div className="epHeader">
          <div>
            <p className="epDate">
              {new Date(episode.datePublished * 1000).toDateString()}
            </p>

            <h3>{episode.name}</h3>
          </div>
          <button
            onClick={() => {
              const {
                name: podcastName,
                uuid: podcastUuid,
                imageUrl,
              } = podcast;
              const episodePod = {
                podcastName,
                podcastUuid,
                imageUrl,
                ...episode,
              };
              store.dispatch(getEpisode(episodePod));
            }}
          >
            <FaPlay />
          </button>
        </div>
        <div className="btnContainer">
          <button className="showBtn" onClick={toggleDescription}>
            {showDescription ? "Hide Description" : "Show Description"}
          </button>
          <button
            className="queueBtn"
            onClick={() => {
              const {
                name: podcastName,
                uuid: podcastUuid,
                imageUrl,
              } = podcast;
              const episodePod = {
                podcastName,
                podcastUuid,
                imageUrl,
                ...episode,
              };
              if (!inQueue) {
                store.dispatch(addtoQueue(episodePod));
                setQueue(!inQueue);
              } else {
                store.dispatch(removeFromQueue(episodePod));
                setQueue(!inQueue);
              }
            }}
          >
            Queue {inQueue ? <TiTick /> : <IoIosAddCircleOutline />}
          </button>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: episode.description }}
          className={showDescription ? "epDescription" : "epDescriptionNone"}
        ></div>
      </div>
    </>
  );
};

export default QueuePodcast;
