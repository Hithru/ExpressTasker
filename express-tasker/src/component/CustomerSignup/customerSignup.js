import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import user from "../../services/customerService";

import auth from "../../services/customerAuth";
import LandingPage_Reviews from "../LandingPage/LandingPage_Reviews";

import "./customerSignup.css";

export default class CustomerSignUp extends Form {
  state = {
    location: [
      "Ampara",
      "Anuradhapura",
      "Badulla",
      "Batticaloa",
      "Colombo",
      "Galle",
      "Gampaha",
      "Hambanthota",
      "Jaffna",
      "Kalutara",
      "Kandy",
      "Kilinochchi",
      "Kurunegala",
      "Mannar",
      "Matale",
      "Matara",
      "Monaragala",
      "Mullativu",
      "Nuwara Eliya",
      "Polonnaruwa",
      "Puttalam",
      "Ratnapura",
      "Trincomalee",
      "Vavuniya",
    ],
    data: { email: "", password: "", username: "", location: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    username: Joi.string().required().label("UserName"),
    location: Joi.string().label("Location"),
  };

  doSubmit = async () => {
    try {
      const response = await user.register(this.state.data);

      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <div className="signup-window">
          <div className="signup-form">
            <h2>Sign Up</h2>
            <form onSubmit={this.handleSubmit} className="signup-form">
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("username", "UserName")}
              {this.renderSelect("location", "Location", this.state.location)}

              {this.renderButton("Register")}
            </form>
          </div>
        </div>
        <LandingPage_Reviews />
      </div>
    );
  }
}
