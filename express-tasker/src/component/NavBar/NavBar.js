import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import axios from "axios";

import expressTaskerLogo from "./ExpressTaskerLogo.png";

class NavBar extends Component {
  render() {
    return (
      <nav>
        <div className="navBar">
          {/* logo container */}
          <div className="logo">
            <Link to="/">
              <img src={expressTaskerLogo} />
            </Link>
          </div>

          {/* all the links in the navBar */}
          <div className="nav-navigation-container">
            <Link className="nav-link" to="/how-it-works">
              How It Works
            </Link>

            <Link className="nav-link" to="/customer-signup">
              SignUp
            </Link>

            <Link className="nav-link" to="/service-provider-signup">
              Become a Service Provider
            </Link>
            {/* 
            <Link className="nav-link" to="skill-verification-request">
              Skill Verification
            </Link> */}

            <div className="login-container">
              <Link to="/">
                <button className="login">Log in</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
