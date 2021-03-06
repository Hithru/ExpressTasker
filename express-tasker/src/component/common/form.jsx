import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import ToolTip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";
import { Typography } from "@material-ui/core";

import "./../CustomerSignup/customerSignup.css";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="signup-submit-button">
        {label}
      </button>
    );
  }
  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={
          <div>
            {label}
            <ToolTip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    Select the district you belongs to
                  </Typography>
                  <br></br>
                  <em>{"Ex:- Colombo, Gampaha, Kandy"}</em>
                </React.Fragment>
              }
            >
              <HelpIcon />
            </ToolTip>
          </div>
        }
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderInput(name, label, type = "text", min = "") {
    const { data, errors } = this.state;
    if (type === "datetime-local") {
      return (
        <Input
          type={type}
          name={name}
          min={min}
          value={data[name]}
          label={label}
          onChange={this.handleChange}
          error={errors[name]}
        />
      );
    }
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
