import React, { Component } from "react";
import axios from "axios";
import auth from "../../services/serviceProviderAuth";
import { apiUrl } from "../../config.json";

export default class SkillVerificationRequest extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAttachments = this.onChangeAttachments.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: "",
      attachments: "",
      serviceProviderDetails: [],
    };
  }
  componentDidMount() {
    const user = auth.getCurrentUser();
    axios
      .post(`${apiUrl}/serviceProvider/${user._id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          serviceProviderDetails: response.data,
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

  onChangeAttachments(e) {
    this.setState({
      attachments: e.target.files[0],
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "serviceProviderName",
      this.state.serviceProviderDetails.username
    );
    formData.append("serviceProviderId", this.state.serviceProviderDetails._id);
    formData.append("email", this.state.serviceProviderDetails.email);
    formData.append("description", this.state.description);
    formData.append("attachments", this.state.attachments);

    console.log(formData);

    const skillVerification = {
      serviceProviderName: this.state.serviceProviderDetails.username,
      serviceProviderId: this.state.serviceProviderDetails._id,
      email: this.state.serviceProviderDetails.email,
      description: this.state.description,
      attachments: this.state.attachments,
    };

    axios.post(`${apiUrl}/skillVerification/send`, formData).then((res) => {
      console.log(res.data);
      window.location = "/service-provider-profile";
    });
  }

  render() {
    // const skillArray=[this.state.serviceProviderDetails.skills]

    return (
      <div className="signup-window">
        <div className="signup-form">
          <h2>Service Provider Verification Request</h2>
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
            <div className="email">
              <label htmlFor="file">Choose Certificates </label>
              <input
                type="file"
                required
                className="form-control"
                filename="attachments"
                // value={this.state.attachments}
                onChange={this.onChangeAttachments}
              />
            </div>
            <div className="submit">
              <button type="submit" className="signup-submit-button">
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
