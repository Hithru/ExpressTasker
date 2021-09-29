import { Component } from "react";
import auth from "../../services/customerAuth";

class Logout extends Component {
  componentDidMount() {
    auth.logout();

    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
