import React, { Component } from "react";
import axios from "axios";
import "./ServiceProviderProfile.css";
import profilepicture from './profile.jpg';
import auth from "../../services/serviceProviderAuth";
import contact from "./contact.png";
import {apiUrl} from "../../config.json";

class ServiceProviderProfile extends Component {
    constructor(props){
        super(props);
  
    this.onChangeProfilePicture = this.onChangeProfilePicture.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          serviceProviderDetails: [],
          profilePhotoDetails:[],
          profilePicture: "",
          profilepicture:'https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png'
        };
       
    }

    componentDidMount() {
    const user = auth.getCurrentUser();
    
    axios
      .get(`${apiUrl}/serviceProvider/${user._id}`)
      .then((response) => {
        console.log(response.data)
        this.setState({
            serviceProviderDetails:response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(`${apiUrl}/serviceProvider/profile/${user._id}`)
      .then((response) => {
        console.log(response.data)
        this.setState({
            profilePhotoDetails:response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });

      const profileState= this.state.profilePhotoDetails.length;
      
      
    }
  
  onChangeProfilePicture(e) {
    this.setState({
      profilePicture: e.target.files[0],
    });

  }

  
  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("serviceProviderName", this.state.serviceProviderDetails.username);
    formData.append("serviceProviderId", this.state.serviceProviderDetails._id);
    formData.append("profilePicture", this.state.profilePicture);

    axios
      .post(`${apiUrl}/serviceProvider/addProfilePicture`, formData)
      .then((res) =>
      {console.log(res.data);
        window.location = "/";
      } );
  }
    
    imageHandler=(e)=>{
      const reader= new FileReader();
      reader.onload=()=>{
        if(reader.readyState===2){
            this.setState({
              profilepicture:reader.result
            })
        }
      }
      reader.readAsDataURL(e.target.files[0])

      axios
        .post(`${apiUrl}/serviceProvider/addProfilePicture`, profilepicture)
        .then((res) => console.log(res.data));
    }
   
  render() {

   
    const {profilepicture}=this.state.profilePicture
    const skillArray=[this.state.serviceProviderDetails.skills]
    const s=skillArray[0]
    console.log(s)
    return (
      <div className="App">
        <section className="container-banner">
            <div class="container">
                  <div class="row">

                      <div class="col-6" id="profile">
              
                      {this.state.profilePhotoDetails.map((value)=>{
                        
              return <div><img id="profilepic" src={true ? ("./profilePhotos/"+ value.profilePicture):"./profilePhotos/Certificate1.jpg"}   width="170" height="170" alt=""/></div>
            })} 
                            
                            
                            {/* <input type="file" name="image-upload" id="input" accept="image/*" onChange={this.imageHandler}/>
                            <div className="label">
                                <label htmlFor="input" className="image-upload">
                                <i id="upload" className="fa fa-upload"></i>
                                </label>
                            </div> */}

                            <form
                                onSubmit={this.onSubmit}
                                encType="multipart/form-data"
                                noValidae
                                className="signup-form2"
                            >
                                    <input type="file" 
                                          required
                                          className="form-control"
                                          filename="profilePicture"
                                          onChange={this.onChangeProfilePicture} />

                                    <div className="submit">
                                                <button type="submit" className="signup-submit-button2">
                                                  upload profile picture
                                                </button>
                                    </div>
                            </form>

                            <h1 className="username"> {this.state.serviceProviderDetails.username}</h1>
                            <a href="/edit-service-provider-profile"><button id="edit">Edit Profile</button></a>
                            <a href="/service-provider-orders"><button id="order">See Orders</button></a>
                      </div>

                      <div class="col-6">
                        <h1 id="success">Grow Your Own Business & Be Success...</h1>
                      </div>

                  </div>
            </div>
      </section>

        <section id="container-about" className="container-about">
                  <h1 className="about">About Me</h1> 
                  <div className="rate"><h5 class="hrate">Description :</h5></div>
                  <p>{this.state.serviceProviderDetails.description}
                  </p>  
                  {/* <div className="rate"><h5 class="hrate">Hourly rate : Rs.500</h5></div> */}
                  <div className="rate"><h5 class="location">Location : {this.state.serviceProviderDetails.location}</h5></div>
                        
        </section>

        <h1 className="skillheader">My Skills</h1>
        <section id="skillheader" >
            
                      <div className="s">Mounting & Installation</div>
                      <div className="s">Delivery Service</div>
                      <div className="s">Cooking Service</div>             
        </section>
        <div className="rate2">
          <h5 class="hrate">For better customer attraction, verify your skills from here :
              <a href="/skill-verification-request"><button id="skillverify">Skill Verification</button></a>
          </h5>
          
        </div>  
  
        <h1 id="contactnav">Contact Information</h1>
        <section className="container-1">
                  <img id="contactimg" src={contact} width="180" height="180" alt="contactlogo"/>
                  <h4>Email : {this.state.serviceProviderDetails.email}</h4>
                  <div id="m"><a id="mail"href="https://mail.google.com/mail/?view=cm&fs=1&to=shamila.18@cse.mrt.ac.lk"><i className="fa fa-envelope"></i> Click Here To Send an Email</a></div>
                  <h4>Contact no: {this.state.serviceProviderDetails.contactNumber}</h4>
        </section>

      </div>
    );
  }
}



export default ServiceProviderProfile;
