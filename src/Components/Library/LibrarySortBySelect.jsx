import { useDispatch } from "react-redux";
import { sortPodcasts } from "../../redux/podcastSlice";

const LibrarySortBySelect = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <label htmlFor="sortLibrary"></label>
        <select
          name="sortLibrary"
          onChange={(e) => {
            dispatch(sortPodcasts(e.target.value));
          }}
        >
          <option>---Sort By---</option>
          <option value="sortAsc">A-Z</option>
          <option value="sortDesc">Z-A</option>
        </select>
      </div>
    </>
  );
};

export default LibrarySortBySelect;
