import { getPodcastByUuid } from "../../apiRequest";
import { setOrder } from "../../redux/podcastSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Form from "react-bootstrap/Form";

const SortBySelect = (uuid) => {
  const dispatch = useDispatch();

  return (
    <>
      <select
        onChange={(e) => {
          getPodcastByUuid(Object.values(uuid)[0], e.target.value, 1, "sorted");
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
