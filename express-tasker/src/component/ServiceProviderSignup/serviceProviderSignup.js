import React, { Component } from "react";
import "./serviceProviderSignup.css";
import auth from "../../services/customerAuth";
import axios from "axios";
import { Checkbox } from "@material-ui/core";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    // this.onChangeSkill = this.onChangeSkill.bind(this);
    this.onChangeSkills = this.onChangeSkills.bind(this);
    this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      skill: [],
      location: "",
      description: "",
      email: "",
      contactNumber:"",
      password: "",
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
      skillname: e.target.value
    });
  }

  onChangeSkills(e) {
    var value=e.target.value
    var previousState= this.state.skill
    
    this.setState({
      skill: [...previousState,value]
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

  onSubmit=async(e)=> {
    e.preventDefault();

    var skillArray= this.state.skill
    var skill=[];
    var skill=skillArray.filter(function(elem,pos){
      return skillArray.indexOf(elem)==pos;
    })

    const serviceProvider = {
      username: this.state.username,
      skill: skill,
      location: this.state.location,
      description: this.state.description,
      contactNumber: this.state.contactNumber,
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5000/serviceProvider/signup", serviceProvider)
      .then((res) => {auth.loginWithJwt(res.headers["x-auth-token"]);
      window.location = "/";}
      
      )
      
    
  }

  render() {
    
    return (
      <div className="signup-window">
        <div className="signup-form">
          <h2>Become a Service Provider</h2>
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
            {/* <div className="email">
              <label>Skills </label>
              
              <select ref="userInput"
                required
                // multiple={true}
                className="form-control"
                value={this.state.skillname}
                onChange={this.onChangeSkill}>
                {
                    this.state.skills.map(function(skillname) {
                    return <option 
                        key={skillname}
                        value={skillname}>{skillname}
                        </option>;
                    })
                }
            </select>
            </div> */}
            <div className="email">
              <label>Select Skills </label>
              <form onChange={this.onChangeSkills}>
              {
                this.state.skills.map(function(skillname) {
                return <div><Checkbox
                value={skillname}
                // onChange={this.onChangeSkills}
                />{skillname}</div>;
                })

            }</form>
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
            <div className="email">
              <label>Email </label>
              <input
                type="text"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="password">
              <label>Password </label>
              <input
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div>

            <div className="submit">
              <button type="submit" className="signup-submit-button">
                Register Me
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
