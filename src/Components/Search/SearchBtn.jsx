import { getPodcastData } from "../../apiRequest";

const SearchBtn = ({ searchTerm }) => {
  return (
    <>
      <button
        className="searchBtn"
        onClick={() => {
          getPodcastData(searchTerm, 1);
      
        }}
      >
        Search Podcast
      </button>
    </>
  );
};

export default SearchBtn;
