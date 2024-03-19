import { useState } from "react";
const EpisodeDescription = ({ description, showDescription}) => {


  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className={showDescription ? "epDescription" : "epDescriptionNone"}
      ></div>
    </>
  );
};

export default EpisodeDescription;
