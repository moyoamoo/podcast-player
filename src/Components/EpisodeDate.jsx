const EpisodeDate = ({ date }) => {
  return (
    <>
      <p className="epDate">
        {new Date(date * 1000).toDateString()}
      </p>
    </>
  );
};

export default EpisodeDate;
