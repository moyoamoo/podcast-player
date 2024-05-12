const FormInput = ({ className, type, name, text, errors, value }) => {
  return (
    <>
      <div className={className}>
        <label htmlFor={name}> {text}</label>
        <input
          type={type}
          name={name}
          id={name}
          value={value && value}
          readOnly={value ? true : false}
        />
        <p>{errors && errors[name]}</p>
      </div>
    </>
  );
};

export default FormInput;
{
  /* <div className="inputContainer">
<label htmlFor="email">New Email</label>
<input type="email" name="email" id="email" />
<p>{errors && errors.email}</p>
</div> */
}
