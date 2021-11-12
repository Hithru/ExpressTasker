import React, { Component } from "react";
import "../ServiceProviderSignup/serviceProviderSignup.css";
import auth from "../../services/customerAuth";
import axios from "axios";
import { Checkbox } from "@material-ui/core";
import { apiUrl } from "../../config.json";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSkills = this.onChangeSkills.bind(this);
    this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
    this.onChangeMerchantID = this.onChangeMerchantID.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      skill: [],
      locations: [
        "Ampara",
        "Anuradhapura",
        "Badulla",
        "Batticaloa",
        "Colombo",
        "Galle",
        "Gampaha",
        "Hambanthota",
        "Jaffna",
        "Kalutara",
        "Kandy",
        "Kilinochchi",
        "Kurunegala",
        "Mannar",
        "Matale",
        "Matara",
        "Monaragala",
        "Mullativu",
        "Nuwara Eliya",
        "Polonnaruwa",
        "Puttalam",
        "Ratnapura",
        "Trincomalee",
        "Vavuniya",
      ],
      location: "",
      description: "",
      email: "",
      contactNumber: "",
      merchantId: "",
      password: "",
      skills: [],
    };
  }

  componentDidMount() {
    const user = auth.getCurrentUser();

    axios
      .post(`${apiUrl}/serviceProvider/${user._id}`)
      .then((response) => {
        this.setState({
          serviceProviderDetails: response.data,
        });
        this.setState({ username: this.state.serviceProviderDetails.username });
        this.setState({ skill: this.state.serviceProviderDetails.skills });
        this.setState({ location: this.state.serviceProviderDetails.location });
        this.setState({
          description: this.state.serviceProviderDetails.description,
        });
        this.setState({ email: this.state.serviceProviderDetails.email });
        this.setState({
          contactNumber: this.state.serviceProviderDetails.contactNumber,
        });
        this.setState({
          merchantId: this.state.serviceProviderDetails.merchantId,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(`${apiUrl}/skill`)
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            skills: response.data.map((skill) => skill.skillname),
            skillname: response.data[0].skillname,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }

  onChangeSkill(e) {
    this.setState({
      skillname: e.target.value,
    });
  }

  onChangeSkills(e) {
    var value = e.target.value;
    var previousState = this.state.skill;

    this.setState({
      skill: [...previousState, value],
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeContactNumber(e) {
    this.setState({
      contactNumber: e.target.value,
    });
  }

  onChangeMerchantID(e) {
    this.setState({
      merchantId: e.target.value,
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();

    var skillArray = this.state.skill;
    var skill = [];
    var skill = skillArray.filter(function (elem, pos) {
      return skillArray.indexOf(elem) == pos;
    });

    const serviceProvider = {
      username: this.state.username,
      skill: skill,
      location: this.state.location,
      description: this.state.description,
      contactNumber: this.state.contactNumber,
      merchantId: this.state.merchantId,
    };

    const user = auth.getCurrentUser();

    axios
      .post(`${apiUrl}/serviceProvider/edit/${user._id}`, serviceProvider)
      .then((res) => {
        window.location = "/service-provider-profile";
      });
  };

  render() {
    return (
      <div className="signup-window">
        <div className="signup-form">
          <h2>Add New Details</h2>
          <form onSubmit={this.onSubmit} noValidate className="signup-form">
            <div className="email">
              <label>Username </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="email">
              <label>Select Skills </label>
              <form onChange={this.onChangeSkills}>
                {this.state.skills.map(function (skillname) {
                  return (
                    <div>
                      <Checkbox
                        value={skillname}
                        // onChange={this.onChangeSkills}
                      />
                      {skillname}
                    </div>
                  );
                })}
              </form>
            </div>
            <div className="email">
              <label>Location </label>
              <select
                ref="userInput"
                required
                className="form-control"
                value={this.state.location}
                onChange={this.onChangeLocation}
              >
                {this.state.locations.map(function (location) {
                  return (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  );
                })}
              </select>
            </div>
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
              <label>PayHere Merchant ID </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.merchantId}
                onChange={this.onChangeMerchantID}
              />
            </div>
            <div className="email">
              <label>Contact no </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.contactNumber}
                onChange={this.onChangeContactNumber}
              />
            </div>

            <div className="submit">
              <button type="submit" className="signup-submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
