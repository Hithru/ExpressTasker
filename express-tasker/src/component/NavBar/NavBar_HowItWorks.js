import React from "react";
import "./NavBar.css";
import "./HowItWorks.css";

const NavBar_HowItWorks = () => {
  return (
    <div className="how-it-works-window">
      <h1>How It Works</h1>

      <div className="how-it-works-container">
        <div className="how-it-works-one-container">
          <div className="how-it-works-one-text">
            <h2>1</h2>
            <h3>Describe the task</h3>
            <p>
              Choose from a variety of home services and select the day and time
              you'd like a qualified Serive Provider to show up. Give us the
              details and we'll find you the help.
            </p>
          </div>
        </div>

        <div className="how-it-works-one-container">
          <div className="how-it-works-one-text">
            <h2>2</h2>
            <h3>Get matched</h3>
            <p>
              Select from a list of qualified and fully vetted Serive Providers
              for the job. Choose Serive Providers by their hourly rate and
              start chatting with them right in the app.
            </p>
          </div>
        </div>

        <div className="how-it-works-one-container">
          <div className="how-it-works-one-text">
            <h2>3</h2>
            <h3>Get it done</h3>
            <p>
              Just like that, your Serive Provider arrives and gets the job
              done. When your task is complete, payment can done through the app
              or Cash Payment.
            </p>
          </div>
        </div>
        <div className="last-conatiner">
          <div className="how-it-works-one-container">
            <div className="how-it-works-one-text">
              <h2>4</h2>
              <h3>Review/Rate Each Other</h3>
              <p>
                After the work is finish both customer and Service Provider Can
                Rate and Review Each Other to Give Feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar_HowItWorks;
