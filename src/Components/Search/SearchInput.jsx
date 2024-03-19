const SearchInput = ({ placeholder, func }) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        onInput={(e) => {
          func(e.target.value);
        }}
      />
    </>
  );
};

export default SearchInput;
