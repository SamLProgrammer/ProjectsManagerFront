import React from "react";

const Input = ({ attribute, handleChange, param, expresion }) => {
  return (
    <div className="inputContainer">
      <input
        id={attribute.name}
        placeholder={attribute.ph}
        name={attribute.name}
        type={attribute.inputType}
        defaultValue={attribute.defaultValue}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        className={param ? "errorStyle" : "regularStyle"}
      />
    </div>
  );
};

export default Input;
