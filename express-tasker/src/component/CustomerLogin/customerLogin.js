import React from "react";
import "./customerLogin.css";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../../services/customerAuth";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    active: false,
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="signup-window">
        <div className="signup-form">
          <h1>Customer Login</h1>

          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
