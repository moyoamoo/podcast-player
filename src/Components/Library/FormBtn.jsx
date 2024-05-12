const FormBtn = ({ type, className, text, func }) => {
  return (
    <>
      <button
        type={type}
        className={className}
        onClick={() => {
          func && func();
        }}
      >
        {text}
      </button>
    </>
  );
};

export default FormBtn;
