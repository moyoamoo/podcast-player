import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/podcastSlice";
import { Link } from "react-router-dom";

const PreviousSearch = ({ search }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Link to="/search">
        <button
          className="previousSearch"
          onClick={() => {
            dispatch(setSearchTerm(search));
          }}
        >
          {search}
        </button>
      </Link>
    </>
  );
};

export default PreviousSearch;
