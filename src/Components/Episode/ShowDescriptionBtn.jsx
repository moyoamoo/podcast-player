const ShowDescriptionBtn = ({ showDescription, toggleDescription }) => {
  return (
    <>
      <button className="showBtn" onClick={toggleDescription}>
        {showDescription ? "Hide Description" : "Show Description"}
      </button>
    </>
  );
};

export default ShowDescriptionBtn;
