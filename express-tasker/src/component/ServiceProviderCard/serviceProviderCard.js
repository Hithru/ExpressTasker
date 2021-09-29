import React, { Component } from "react";
import axios from "axios";
import "../ServiceProviderProfile/ServiceProviderProfile.css";
import contact from "../ServiceProviderProfile/contact.png";

class ServiceProviderCard extends Component {
    constructor(props){
        super(props);

        this.state = {
          serviceProviderDetails: [],
        };
       
    }

    // componentDidMount() {
        
    //     axios
    //     .get(`http://localhost:5000/serviceProvider/${user._id}`)
    //     .then((response) => {
    //         console.log(response.data)
    //         this.setState({
    //             serviceProviderDetails:response.data
    //         })
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    // }
       
  render() {
    
    return (
      <div className="App">
        <section className="banner-card">
            <div class="container">
                  <div class="row">
                            <h1 className="username2"><h5 className="username3">service provider</h5> Shamila Nuwan</h1>
                  </div>
            </div>
      </section>

        <section id="container-about" className="container-about">
                  <h1 className="about2">About Service Provider</h1> 
                  <div className="rate"><h5 class="hrate">Description :</h5></div>
                  <p>A customer service representative supports customers by providing helpful information, answering questions, and responding to complaints. They're the front line of support for clients and customers and they help ensure that customers are satisfied with products, services, and features.
                  </p>  
                  <div className="rate"><h5 class="hrate">Hourly rate : 27</h5></div>
                  <div className="rate"><h5 class="location">Location : Galle</h5></div>
                        
        </section>

        <h1 className="skillheader2">Services</h1>
        <section id="skillheader" className="flex-project-container">
                  
                    <div>Plumbing</div>
                    <div>Trical</div>
                    <div>Wood</div>  
                    <div>Plumb</div>
                    <div>Trical</div>            
        </section>
       
        <h1 id="contactnav">Contact Information</h1>
        <section className="container-1">
                  <img id="contactimg" src={contact} width="180" height="180" alt="contactlogo"/>
                  <h4>Email : shamila@gmail.com</h4>
                  <div id="m"><a id="mail"href="https://mail.google.com/mail/?view=cm&fs=1&to=shamila.18@cse.mrt.ac.lk"><i className="fa fa-envelope"></i> Click Here To Send an Email</a></div>
                  <h4>Contact no: 0779112192</h4>
        </section>

      </div>
    );
  }
}



export default ServiceProviderCard;
