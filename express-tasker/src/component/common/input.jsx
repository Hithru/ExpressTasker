import React from "react";
import "./../CustomerSignup/customerSignup.css";
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="email">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
