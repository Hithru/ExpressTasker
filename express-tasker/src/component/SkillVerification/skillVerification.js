import React, { Component } from 'react';
import axios from 'axios';

export default class SkillVerificationRequest extends Component {
  constructor(props) {
    super(props);

    this.onChangeSkills = this.onChangeSkills.bind(this);
    this.onChangeConfirmedFrom = this.onChangeConfirmedFrom.bind(this);
    this.onChangeAttachments = this.onChangeAttachments.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      skills:'',
      confirmedFrom:'',
      attachments:''
    }
  }

  onChangeSkills(e) {
    this.setState({
      skills: e.target.value
    })
  }

  onChangeConfirmedFrom(e) {
    this.setState({
      confirmedFrom: e.target.value
    })
  }

  onChangeAttachments(e) {
    this.setState({
      attachments: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
   
    const skillVerification = {
      skills: this.state.skills,
      confirmedFrom : this.state.confirmedFrom,
      attachments : this.state.attachments
    }

    console.log(skillVerification);

    axios.post('http://localhost:5000/skillVerification/send', skillVerification)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (

        <div className="wrapper">
        <div className="form-wrapper">
          <h2>Skill Verification Request</h2>
          <form onSubmit={this.onSubmit} noValidate>
            <div className="form-group"> 
            <label>Skills: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.skills}
                onChange={this.onChangeSkills}
                />
            </div>
            <div className="form-group"> 
            <label>Confirmed From: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.confirmedFrom}
                onChange={this.onChangeConfirmedFrom}
                />
            </div>
            <div className="form-group"> 
            <label>Attachments: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.attachments}
                onChange={this.onChangeAttachments}
                />
            </div>
            <div className="submit">
              <button type="submit">Send Request</button>
            </div>
            
          </form>
        </div>
      </div>


        
    
    )
  }
}