import React, { Component } from "react";
import "./customerProfile.css";
import axios from "axios";
import auth from "../../services/customerAuth";
import { apiUrl } from "../../config.json";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerDetails: [],
    };
  }

  componentDidMount() {
    const user = auth.getCurrentUser();
    axios
      .post(`${apiUrl}/customer/${user._id}`)
      .then((response) => {
        this.setState({
          customerDetails: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div class="signup-window">
        <div className="signup-form" id="customerProfile">
          <h2 className="title">Customer Profile</h2>
          <h3 className="data">
            username: {this.state.customerDetails.username}
          </h3>
          <h3 className="data">email: {this.state.customerDetails.email}</h3>
          <h3 className="data">rating: {this.state.customerDetails.rating}</h3>
        </div>
      </div>
    );
  }
}
