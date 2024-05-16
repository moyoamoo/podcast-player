import { useDispatch } from "react-redux";
import { getPodcastData } from "../../apiRequests/PodcastData/getPodcastData";
import { setIsLoading } from "../../redux/podcastSlice";

const SearchBtn = ({ searchTerm }) => {
  console.log(searchTerm);
  const dispatch = useDispatch();
  return (
    <>
      <button
        className="searchBtn"
        onClick={() => {
          getPodcastData(searchTerm, 2, 1, "search");
          dispatch(setIsLoading(true));
        }}
      >
        Search Podcast
      </button>
    </>
  );
};

export default SearchBtn;
