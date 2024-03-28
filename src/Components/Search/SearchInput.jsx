import { useDispatch } from "react-redux";

const SearchInput = ({ placeholder, func }) => {
  const dispatch = useDispatch()
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        onInput={(e) => {
          dispatch(func(e.target.value));
        }}
      />
    </>
  );
};

export default SearchInput;
