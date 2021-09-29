import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import axios from "axios";

import expressTaskerLogo from "./ExpressTaskerLogo.png";
const NavBar = ({ user }) => {
  return (
    <nav>
      <div className="navBar">
        {/* logo container */}
        <div className="logo">
          <NavLink to="/">
            <img src={expressTaskerLogo} />
          </NavLink>
        </div>

        {/* all the links in the navBar */}
        <div className="nav-navigation-container">
          <NavLink className="nav-link" to="/how-it-works">
            How It Works
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className="nav-link" to="/customer-signup">
                SignUp
              </NavLink>

              <Link className="nav-link" to="/service-provider-signup">
                Become a Service Provider
              </Link>

              <div className="login-container">
                <Link to="/customer-login">
                  <button className="login">Customer Login</button>
                </Link>
              </div>
              <div className="login-container">
                <Link to="/service-provider-login">
                  <button className="login">ServiceProvider Login</button>
                </Link>
              </div>
            </React.Fragment>
          )}
          {user && user.isServiceProvider && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="#">
                Messages
              </NavLink>
              <NavLink className="nav-item nav-link" to="/service-provider-profile">
                {user.username}
              </NavLink>
              
              <NavLink
                className="nav-item nav-link"
                to="/service-provider-orders"
              >
                Order
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout</NavLink>
            </React.Fragment>
          )}
          {user && !user.isServiceProvider && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/search">
                Search
              </NavLink>
              <NavLink className="nav-item nav-link" to="#">
                Messages
              </NavLink>
              <NavLink className="nav-item nav-link" to="/customer-orders">
                Orders
              </NavLink>
              <NavLink className="nav-item nav-link" to="/customer-profile">
                {user.username}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
          {/* {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/service-provider-profile">
                {user.username}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )} */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
