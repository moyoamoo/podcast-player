import { useSelector } from "react-redux";
import { selectPreviousSearches } from "../../redux/statsSlice";
import PreviousSearch from "./PreviousSearch";
const PreviousSearches = () => {
  const previousSearches = useSelector(selectPreviousSearches);
  return (
    <div className="searchesContainer">
      <h3 className="discoverHeaders">Previous Searches</h3>
      <div className="previousSearches">
        {previousSearches.map((search) => {
          return <PreviousSearch search={search} />;
        })}
      </div>
    </div>
  );
};

export default PreviousSearches;
