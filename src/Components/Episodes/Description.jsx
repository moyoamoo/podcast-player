const Description = ({ description }) => {
  return (
    <>
      <div
        className="podDescription"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </>
  );
};

export default Description;
