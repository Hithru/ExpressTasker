import React, { Component } from "react";
import routes from "./routes";
import NavBar from "../src/component/NavBar/NavBar";
import Footer from "../src/component/Footer/Footer";
import "./App.css";
import "./reset.css";
import "./bootstrap-5.1.0-dist/css/bootstrap.min.css";
import authCustomer from "./services/customerAuth";
import authServiceProvider from "./services/serviceProviderAuth";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = authCustomer.getCurrentUser();

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <NavBar user={user} />
        {routes}
        <Footer />
      </div>
    );
  }
}

export default App;
