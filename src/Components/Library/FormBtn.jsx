const FormBtn = ({ type, className, text, func }) => {
  return (
    <>
      <div className={className}>
        <button
          type={type}
          onClick={() => {
            func && func();
          }}
        >
          {text}
        </button>
      </div>
    </>
  );
};

export default FormBtn;
