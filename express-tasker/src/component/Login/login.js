import React from "react";
import "./login.css";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  toggleClass = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };

  render() {
    return (
      <div className="login-body">
        <div
          className={
            this.state.active
              ? "login-page-container left-panel-active"
              : "login-page-container right-panel-active"
          }
        >
          <div className="login-form-container sign-up-container">
            <form className="login-page-form" action="#" method="#">
              <h1 className="login-h1">Customer</h1>

              <input
                className="login-input"
                type="email"
                placeholder="Email"
                name="email"
              />
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                name="password"
              />

              <button className="login-button">Sign In</button>
            </form>
          </div>

          <div className="login-form-container sign-in-container">
            <form className="login-page-form" action="#" method="#">
              <h1 className="login-h1">Service Provider</h1>

              <input
                className="login-input"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
              <input
                className="login-input"
                type="password"
                id="email"
                name="password"
                placeholder="Password"
              />

              <button className="login-button">Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="login-h1">Service Provider</h1>
                <p className="login-p">
                  To keep connected with us please login with your Account info
                </p>
                <button
                  className="login-button ghost"
                  onClick={this.toggleClass}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="login-h1">Customer</h1>
                <p className="login-p">
                  To keep connected with us please login with your Account info
                </p>
                <button
                  className="login-button ghost"
                  onClick={this.toggleClass}
                >
                  Sign IN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
