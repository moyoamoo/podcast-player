import { getPodcastData } from "../../apiRequest";

const SearchBtn = ({ searchTerm }) => {
  console.log(searchTerm)
  return (
    <>
      <button
        className="searchBtn"
        onClick={() => {
          getPodcastData(searchTerm, 2, 1, "search");
        }}
      >
        Search Podcast
      </button>
    </>
  );
};

export default SearchBtn;
