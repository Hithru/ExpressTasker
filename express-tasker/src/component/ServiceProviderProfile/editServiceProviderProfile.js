import React, { Component } from "react";
import "../ServiceProviderSignup/serviceProviderSignup.css";
import axios from "axios";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSkill = this.onChangeSkill.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      skillname: "",
      location: "",
      description: "",
      skills: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/skill")
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

  onChangeLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }

  onChangeSkill(e) {
    this.setState({
      skillname: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const serviceProvider = {
      username: this.state.username,
      skillname: this.state.skillname,
      location: this.state.location,
      description: this.state.description,
    };

    console.log(serviceProvider);

    axios
      .post("http://localhost:5000/serviceProvider/signup", serviceProvider)
      .then((res) => console.log(res.data));

    window.location = "/";
  }



  render() {
    return (
      <div class="signup-window">
        <div className="signup-form">
          <h2>Edit Profile</h2>
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
              <label>Skills </label>
              
              <select ref="userInput"
                required
                // multiple={true}
                className="form-control"
                value={this.state.skillname}
                onChange={this.onChangeSkill}
                onChange={this.on}>
                {
                    this.state.skills.map(function(skillname) {
                    return <option 
                        key={skillname}
                        value={skillname}>{skillname}
                        </option>;
                    })
                }
            </select>
            </div>
            <div className="email">
              <label>Location </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.location}
                onChange={this.onChangeLocation}
              />
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
