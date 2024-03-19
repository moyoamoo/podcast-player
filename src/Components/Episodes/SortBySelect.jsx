import { getPodcastByUuid } from "../../apiRequest";
import { setOrder } from "../../redux/podcastSlice";

const SortBySelect = (uuid) => {
  return (
    <>
      <select
        onChange={(e) => {
          getPodcastByUuid(uuid, e.target.value, 1, "sorted");
          dispatch(setOrder(e.target.value));
        }}
      >
        <option>---Sort By---</option>
        <option value="1">Sort by Oldest</option>
        <option value="2">Sort by Newest</option>
      </select>
    </>
  );
};

export default SortBySelect;
