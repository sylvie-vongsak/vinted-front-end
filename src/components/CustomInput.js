const CustomInput = ({ title, state, setState, type }) => {
  return (
    <div>
      <label htmlFor={title}>{title}</label>
      <input
        className="titi"
        id={title}
        type={!type ? "text" : type}
        value={state}
        onChange={(event) => {
          setState(event.target.value);
        }}
      />
    </div>
  );
};

export default CustomInput;
