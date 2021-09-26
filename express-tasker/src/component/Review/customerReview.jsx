import React, { Component } from "react";
import "./customerReview.css";

export default class CustomerReview extends Component {
  render() {
    return (
      <div className="signup-window">
        <div className="signup-form">
          <h2>Give Your Feedback</h2>
          <form className="signup-form">
            <div className="rating">
              <input type="radio" name="rating" value="5" id="5" />
              <label for="5">☆</label>

              <input type="radio" name="rating" value="4" id="4" />
              <label for="4">☆</label>

              <input type="radio" name="rating" value="3" id="3" />
              <label for="3">☆</label>

              <input type="radio" name="rating" value="2" id="2" />
              <label for="2">☆</label>

              <input type="radio" name="rating" value="1" id="1" />
              <label for="1">☆</label>
            </div>
            <textarea className="textareaforReview" />
            <button type="submit" className="signup-submit-button">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    );
  }
}
