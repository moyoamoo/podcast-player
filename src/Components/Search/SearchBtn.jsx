import { getPodcastData } from "../../apiRequest";

const SearchBtn = ({ searchTerm }) => {
  console.log(searchTerm)
  return (
    <>
      <button
        className="searchBtn"
        onClick={() => {
          getPodcastData(searchTerm);
        }}
      >
        Search Podcast
      </button>
    </>
  );
};

export default SearchBtn;
