import React, { Component } from "react";
import axios from "axios";
import auth from "../../services/serviceProviderAuth";

export default class SkillVerificationRequest extends Component {
  constructor(props) {
    super(props);

    this.onChangeSkills = this.onChangeSkills.bind(this);
    this.onChangeConfirmedFrom = this.onChangeConfirmedFrom.bind(this);
    this.onChangeAttachments = this.onChangeAttachments.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      skill: "",
      confirmedFrom: "",
      attachments: "",
      skills: [],
      serviceProviderDetails: [],
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

      // const user = auth.getCurrentUser();
      // axios
      //   .get(`http://localhost:5000/serviceProvider/${user._id}`)
      //   .then((response) => {
      //     console.log(response.data)
      //     this.setState({
      //         serviceProviderDetails:response.data
      //     })
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
  }

  onChangeSkills(e) {
    this.setState({
      skill: e.target.value,
    });
  }

  onChangeConfirmedFrom(e) {
    this.setState({
      confirmedFrom: e.target.value,
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

    formData.append("skills", this.state.skill);
    formData.append("confirmedFrom", this.state.confirmedFrom);
    formData.append("attachments", this.state.attachments);

    console.log(formData);

    const skillVerification = {
      skill: this.state.skill,
      confirmedFrom : this.state.confirmedFrom,
      attachments : this.state.attachments
    }

    axios
      .post("http://localhost:5000/skillVerification/send", formData)
      .then((res) =>
      {console.log(res.data);
        window.location = "/service-provider-profile";
      } );

  }

  render() {
    // const skillArray=[this.state.serviceProviderDetails.skills]

    return (
      <div className="signup-window">
        <div className="signup-form">
          <h2>Skill Verification Request</h2>
          <form
            onSubmit={this.onSubmit}
            encType="multipart/form-data"
            noValidae
            className="signup-form"
          >
            <div className="email">
              <label>Choose Skill </label>
              <select
                ref="userInput"
                required
                className="form-control"
                value={this.state.skill}
                onChange={this.onChangeSkills}
              >
                {this.state.skills.map(function (skillname) {
                  return (
                    <option key={skillname} value={skillname}>
                      {skillname}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="email">
              <label>Confirmed Company Name </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.confirmedFrom}
                onChange={this.onChangeConfirmedFrom}
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
