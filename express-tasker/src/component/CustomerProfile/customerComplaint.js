import React, { Component } from "react";
import axios from "axios";
import auth from "../../services/customerAuth";
import { apiUrl } from "../../config.json";

export default class CustomerComplaint extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: "",
      customerDetails: [],
    };
  }
  async componentDidMount() {
    const user = auth.getCurrentUser();
    await axios
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

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const customerComplaint = {
      customer_id: this.state.customerDetails._id,
      customer_name: this.state.customerDetails.username,
      customer_email: this.state.customerDetails.email,
      description: this.state.description,
    };

    await axios
      .post(`${apiUrl}/customer/createcomplaint`, customerComplaint)
      .then((res) => {
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="signup-window">
        <div className="signup-form">
          <h2>Create Complaint</h2>
          <form
            onSubmit={this.onSubmit}
            encType="multipart/form-data"
            noValidae
            className="signup-form"
          >
            <div className="email">
              <label>Description </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div>

            <div className="submit">
              <button type="submit" className="signup-submit-button">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
