import React, { Component } from "react";
import axios from "axios";
import "./ServiceProviderProfile.css";
import profilepicture from './profile.jpg';
import auth from "../../services/serviceProviderAuth";
import contact from "./contact.png";

class ServiceProviderProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
          serviceProviderDetails: [],
          profilepicture:'https://picsum.photos/200'
        };
       
    }

    componentDidMount() {
    const user = auth.getCurrentUser();
    axios
      .get(`http://localhost:5000/serviceProvider/${user._id}`)
      .then((response) => {
        console.log(response.data)
        this.setState({
            serviceProviderDetails:response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
      
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
    const skillArray=[this.state.serviceProviderDetails.skills]
    
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
                            <h1 className="username"> {this.state.serviceProviderDetails.username}</h1>
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
                  <p>{this.state.serviceProviderDetails.description}
                  </p>  
                  <div className="rate"><h5 class="hrate">Hourly rate : Rs.500</h5></div>
                  <div className="rate"><h5 class="location">Location : {this.state.serviceProviderDetails.location}</h5></div>
                        
        </section>

        <h1 className="skillheader">My Skills</h1>
        <section id="skillheader" >
            {/* {skillArray.map((value)=>{
              return <div key={value} value={value}>{value}</div>
            })}  */}
                      <div className="s">Mounting And Installation</div>
                      <div className="s">Delivery Service</div>
                      <div className="s">Home Service</div>             
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
