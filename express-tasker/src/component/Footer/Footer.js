import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="fruit-by-the-foot">
        <div className="footer-left-links">
          <p>
            Follow Us!{" "}
            <a href="#">
              <i class="fab fa-facebook-square" />{" "}
            </a>
            <a href="#">
              <i class="fab fa-twitter-square" />{" "}
            </a>
            <a href="#">
              <i class="fab fa-instagram" />
            </a>
          </p>
        </div>
        <div className="logo-image-footer">
          <Link to="/">
            <img width={145} src="#" />
          </Link>
        </div>
        <div className="footer-right-links">
          <p>
            <Link to="/how-it-works">How It Works</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
