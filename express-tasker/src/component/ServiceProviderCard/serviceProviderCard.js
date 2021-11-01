import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
// import "../ServiceProviderProfile/ServiceProviderProfile.css";
import contact from "../ServiceProviderProfile/contact.png";
import auth from "../../services/customerAuth";
import { apiUrl } from "../../config.json";
import { ControlPointDuplicateOutlined } from "@material-ui/icons";
import "./serviceprovidercard.css";

class ServiceProviderCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceProviderDetails: [],
      shouldRedirect: false,
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios
      .get(`${apiUrl}/serviceProvider/${id}`)
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

  clickConnect = async () => {
    const user = auth.getCurrentUser(); //getting current user
    const user_id = user._id; //getting user's id
    const service_provider_id = this.state.serviceProviderDetails._id; //getting service provider id
    try {
      const res_1 = await axios.get(
        apiUrl +
          "/conversations/isThereConversation/" +
          user_id +
          "/" +
          service_provider_id
      ); //get conversaton list specific to user and service provider
      console.log(res_1.data.length);
      if (res_1.data.length <= 0) {
        const res_2 = await axios.post(apiUrl + "/conversations/", {
          senderId: user_id,
          receiverId: service_provider_id,
        });
      }
      this.setState({ shouldRedirect: true });
      console.log(this.state.shouldRedirect);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const skillArray = [this.state.serviceProviderDetails.skills];
    console.log(this.state.serviceProviderDetails);
    return (
      <div className="App">
        <section className="banner-card" style={{ width: "97%" }}>
          <div class="container" style={{ flexDirection: "column" }}>
            <div class="col-9">
              <h1 className="username2">
                <h5 className="username3">service provider</h5>{" "}
                {this.state.serviceProviderDetails.username}
              </h1>
            </div>
            <div className="buttonGroup" style={{ flexDirection: "row" }}>
              <button
                className="button"
                onClick={(e) => {
                  {
                    this.clickConnect();
                  }
                }}
              >
                Connect
              </button>
              <a
                href={
                  "/create-order/" +
                  this.state.serviceProviderDetails._id +
                  "/" +
                  this.state.serviceProviderDetails.username
                }
              >
                <button className="button">Create Order</button>
              </a>
              {this.state.shouldRedirect ? (
                <Redirect push to="/messenger" />
              ) : null}
            </div>
          </div>
        </section>
        <section id="container-about" className="container-about">
          <h1 className="about2">About Service Provider</h1>
          <div className="rate">
            <h5 class="hrate">Description :</h5>
          </div>
          <p>{this.state.serviceProviderDetails.description}</p>
          <div className="rate">
            <h5 class="hrate">Hourly rate : Rs . 500</h5>
          </div>
          <div className="rate">
            <h5 class="location">
              Location : {this.state.serviceProviderDetails.location}
            </h5>
          </div>
        </section>
        \<h1 className="skillheader2">Services</h1>
        <section id="skillheader">
          {/* {skillArray.map((value)=>{
                          return <div key={value} value={value}>{value}</div>
                        })}            */}
          <div className="s">Mounting And Installation</div>
          <div className="s">Delivery Service</div>
          <div className="s">Home Service</div>
        </section>
        <h1 id="contactnav">Contact Information</h1>
        <section className="container-1">
          <img
            id="contactimg"
            src={contact}
            width="180"
            height="180"
            alt="contactlogo"
          />
          <h4>Email : {this.state.serviceProviderDetails.email}</h4>
          <div id="m">
            <a
              id="mail"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=shamila.18@cse.mrt.ac.lk"
            >
              <i className="fa fa-envelope"></i> Click Here To Send an Email
            </a>
          </div>
          <h4>Contact no: {this.state.serviceProviderDetails.contactNumber}</h4>
        </section>
      </div>
    );
  }
}

export default ServiceProviderCard;
