import React, { Component } from "react";
import { connect } from "react-redux";
import "./TaskerDashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";
class ServiceProviderDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      picture: "",
      location: ""
    };
  }

  componentDidMount() {
    this.setProfile();
  }

  setProfile = id => {
    axios.get(`/api/profile/${this.props.match.params.tasker_id}`).then(res => {
      console.log("helllerooo", this.props.match.params);
      this.setState({
        name: res.data.name,
        picture: res.data.picture,
        location: res.data.location
      });
    });
  };

  render() {
    console.log(this.props, " props for dash");
    return (
      <div className="tasker-dash">
        Tasker Dashboard
        <Link to={`/edit-service-provider-profile`}>
          Edit Profile
        </Link>
      </div>
    );
  }
}


export default ServiceProviderDashboard;
