import { useSelector } from "react-redux";
import { selectPreviousSearches } from "../../redux/statsSlice";
import PreviousSearch from "./PreviousSearch";
const PreviousSearches = () => {
  const previousSearches = useSelector(selectPreviousSearches);
  return (
    <>
      {previousSearches.map((search) => {
        return <PreviousSearch search={search} />;
      })}
    </>
  );
};

export default PreviousSearches;
