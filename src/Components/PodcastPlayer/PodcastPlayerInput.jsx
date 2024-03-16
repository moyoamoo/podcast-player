const PodcastPlayerInput = ({ ref, func, value }) => {
  return (
    <>
      <input
        type="range"
        ref={ref}
        min="0"
        max="100"
        value={value}
        onChange={func}
      />
    </>
  );
};

export default PodcastPlayerInput;
