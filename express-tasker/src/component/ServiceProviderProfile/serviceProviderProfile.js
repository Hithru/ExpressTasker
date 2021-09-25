import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ServiceProviderProfile.css";
import profilepicture from './profile.jpg';
import contact from "./contact.png";

class ServiceProviderProfile extends Component {

  state={
    profilepicture:'https://picsum.photos/200'
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
      .post("http://localhost:5000/serviceProvider/addProfilePicture", profilepicture)
      .then((res) => console.log(res.data));
  }
  
  render() {

    const {profilepicture}=this.state
    
    return (
      <div className="App">
        <section className="container-banner">
            <div class="container">
                  <div class="row">

                      <div class="col-6" id="profile">
                            <div><img id="profilepic" src={profilepicture}  width="170" height="170" alt=""/></div>
                            <input type="file" name="image-upload" id="input" accept="image/*" onChange={this.imageHandler}/>
                      
                            <div className="label">
                                <label htmlFor="input" className="image-upload">
                                <i id="upload" className="fa fa-upload"></i>
                                </label>
                            </div>
                            <h1 className="username"> Shamila Nuwan</h1>
                            <a href="/edit-service-provider-profile"><button id="edit">Edit Profile</button></a>
                            <a href="/"><button id="order">See Orders</button></a>
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
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                  </p>  
                  <div className="rate"><h5 class="hrate">Hourly rate : 27</h5></div>
                        
        </section>

        <h1 className="skillheader">My Skills</h1>
        <section id="skillheader" className="flex-project-container">
                    <div>Plumbing</div>
                    <div>Trical</div>
                    <div>Wood</div>  
                    <div>Plumb</div>
                    <div>Trical</div>            
        </section>
        <div className="rate2">
          <h5 class="hrate">For better customer attraction, verify your skills from here :
              <a href="/skill-verification-request"><button id="skillverify">Skill Verification</button></a>
          </h5>
          
        </div>  
  
        <h1 id="contactnav">Contact Information</h1>
        <section className="container-1">
                  <img id="contactimg" src={contact} width="180" height="180" alt="contactlogo"/>
                  <h4>Email : shamila.18@cse.mrt.ac.lk</h4>
                  <div id="m"><a id="mail"href="https://mail.google.com/mail/?view=cm&fs=1&to=shamila.18@cse.mrt.ac.lk"><i className="fa fa-envelope"></i> Click Here To Send an Email</a></div>
                  <h4>Contact no: 0779112192</h4>
        </section>

      </div>
    );
  }
}



export default ServiceProviderProfile;
