import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-main-text">
          <h1>
            The convenient & affordable way to get things done around the home
          </h1>
          <p>
            Choose from Experience Service Providers for help afordable price.
          </p>
        </div>
        <div className="header-links">
          <span>
            <Link to="/">
              <button>Mounting & Installation</button>
            </Link>

            <Link to="/">
              <button>Delivery Service</button>
            </Link>

            <Link to="/">
              <button>Yardwork/Landscaping</button>
            </Link>

            <Link to="/">
              <button>Home Improvement</button>
            </Link>

            <Link to="/">
              <button>Moving & Packing</button>
            </Link>

            <Link to="/">
              <button>Electrical Plumbing</button>
            </Link>

            <Link to="/">
              <button>Furniture Assembly</button>
            </Link>

            <Link to="/">
              <button>Cleaning Service</button>
            </Link>

            <Link to="/">
              <button>Cooking Service</button>
            </Link>
          </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.tasker;
  return {
    user,
  };
};

export default Header;
