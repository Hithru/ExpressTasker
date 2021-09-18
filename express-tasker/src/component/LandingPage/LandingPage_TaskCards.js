import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import mounting from "./mounting.png";
import delivery from "./delivery.png";
import gardening from "./gardening.png";
import furniture from "./furniture.png";
import moving from "./moving.png";
import homeimprove from "./homeimprove.png";
import light from "./light.png";
import toilet from "./toilet.png";
import cleaning from "./cleaning.png";

class LandingPage_TaskCards extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };

    return (
      <div className="TaskCards-component">
        <h1>Popular Tasks In Your Area</h1>
        <Slider {...settings}>
          <div className="card">
            <div>
              <img src={mounting} alt="" />
            </div>
            <div className="card-button">
              <Link to="/">
                <button onClick={this.login}>Mounting & Installation</button>
              </Link>
            </div>
          </div>
          <div className="card">
            <div>
              <img src={delivery} alt="" />
            </div>
            <div className="card-button">
              <Link to="/">
                <button onClick={this.login}>Delivery Service</button>
              </Link>
            </div>
          </div>
          <div className="card">
            <div>
              <img src={gardening} alt="" />
            </div>
            <div className="card-button">
              <Link to="/">
                <button onClick={this.login}>Landscaping</button>
              </Link>
            </div>
          </div>
          <div className="card">
            <div>
              <img src={homeimprove} alt="" />
            </div>
            <div className="card-button">
              <Link to="/">
                <button onClick={this.login}>Home Improvement</button>
              </Link>
            </div>
          </div>
          <div className="card">
            <div>
              <img src={moving} alt="" />
            </div>
            <div className="card-button">
              <Link to="/">
                <button onClick={this.login}>Moving & Packing</button>
              </Link>
            </div>
          </div>
          <div className="card">
            <div>
              <img src={toilet} alt="" />
            </div>
            <div className="card-button">
              <Link to="/">
                <button onClick={this.login}>Home Service</button>
              </Link>
            </div>
          </div>
          <div className="card">
            <div>
              <img src={furniture} alt="" />
            </div>
            <div className="card-button">
              <Link to="/">
                <button onClick={this.login}>Furniture Assembly</button>
              </Link>
            </div>
          </div>
          <div className="card">
            <div>
              <img src={cleaning} alt="" />
            </div>
            <div className="card-button">
              <Link to="/">
                <button onClick={this.login}>Cleaning Service</button>
              </Link>
            </div>
          </div>
          <div className="card">
            <div>
              <img src={light} alt="" />
            </div>
            <div className="card-button">
              <Link to="/">
                <button onClick={this.login}>Cooking Service</button>
              </Link>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.tasker;
  return {
    user,
  };
};

export default LandingPage_TaskCards;
