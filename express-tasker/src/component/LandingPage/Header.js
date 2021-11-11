import React, { Component } from "react";
import { Link } from "react-router-dom";
import ToolTip from "@material-ui/core/Tooltip";
import { Typography } from "@material-ui/core";
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
            <ToolTip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    Mount or install your home accessories in a way you want.
                  </Typography>
                  <br></br>
                  <em>{"Ex:- TV installation, CCTV installation"}</em>
                </React.Fragment>
              }
            >
              <Link to="/">
                <button>Mounting & Installation</button>
              </Link>
            </ToolTip>

            <ToolTip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    Transfer your accessories with no sweat.
                  </Typography>
                  <br></br>
                  <em>{"Ex:- Package Delivery Service"}</em>
                </React.Fragment>
              }
            >
              <Link to="/">
                <button>Delivery Service</button>
              </Link>
            </ToolTip>

            <ToolTip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    Keep your environment neat and clean.
                  </Typography>
                  <br></br>
                  <em>{"Ex:- Landscaping , Gardening Services"}</em>
                </React.Fragment>
              }
            >
              <Link to="/">
                <button>Yardwork/Landscaping</button>
              </Link>
            </ToolTip>

            <ToolTip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    Improve your home by every perspective.
                  </Typography>
                  <br></br>
                  <em>{"Ex:- Home Renovations"}</em>
                </React.Fragment>
              }
            >
              <Link to="/">
                <button>Home Improvement</button>
              </Link>
            </ToolTip>

            <ToolTip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    No need of sweat for moving and packing things anymore.
                  </Typography>
                  <br></br>
                  <em>{"Ex:- Home Relocation Services"}</em>
                </React.Fragment>
              }
            >
              <Link to="/">
                <button>Moving & Packing</button>
              </Link>
            </ToolTip>

            <ToolTip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    Power disturbing you? No need to worry.
                  </Typography>
                  <br></br>
                  <em>{"Ex:- Repairs on Electrical Systems"}</em>
                </React.Fragment>
              }
            >
              <Link to="/">
                <button>Electrical Plumbing</button>
              </Link>
            </ToolTip>

            <ToolTip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    No Time for assembling things. We are here to help.
                  </Typography>
                  <br></br>
                  <em>{"Ex:- Assembling Large Furniture Items"}</em>
                </React.Fragment>
              }
            >
              <Link to="/">
                <button>Furniture Assembly</button>
              </Link>
            </ToolTip>

            <ToolTip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    Things getting dirty?No need of headaches.
                  </Typography>
                  <br></br>
                  <em>{"Ex:- Cleaning services"}</em>
                </React.Fragment>
              }
            >
              <Link to="/">
                <button>Cleaning Service</button>
              </Link>
            </ToolTip>

            <ToolTip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    An event? Who to cook? We know reliables.
                  </Typography>
                  <br></br>
                  <em>{"Ex:- Catering Services"}</em>
                </React.Fragment>
              }
            >
              <Link to="/">
                <button>Cooking Service</button>
              </Link>
            </ToolTip>
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
