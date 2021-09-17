import React from "react";
import "./customerSignup.css";
import axios from "axios";
import LandingPage_Reviews from "../LandingPage/LandingPage_Reviews";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("working");
    const customer = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    console.log(customer);

    axios
      .post("http://localhost:5000/customer/signup", customer)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <div className="signup-window">
          <div className="signup-form">
            <h2>Sign Up</h2>
            <form onSubmit={this.onSubmit} noValidate className="signup-form">
              <div className="email">
                <label>Full Name</label>
                <input
                  type="text"
                  name="username"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="email">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="password">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="submit">
                <button className="singup-submit-button">Register Me</button>
              </div>
            </form>
          </div>
        </div>
        <LandingPage_Reviews />
      </div>
    );
  }
}
