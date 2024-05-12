const FormReadOnlyInput = ({className, name, text, value, type }) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{text}</label>
      <input type={type} name={name} id={name} value={value} readOnly={true}/>
    </div>
  );
};

export default FormReadOnlyInput;
