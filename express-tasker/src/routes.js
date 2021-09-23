import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage/LandingPage";
import NavBar_HowItWorks from "./component/NavBar/NavBar_HowItWorks";
//import TaskerProfile from "./component/TaskerProfile/TaskerProfile";
import CustomerSignup from "./component/CustomerSignup/customerSignup";
import ServiceProviderSignup from "./component/ServiceProviderSignup/serviceProviderSignup";
import ServiceProviderProfile from "./component/ServiceProviderProfile/serviceProviderProfile";
import ServiceProviderDashboard from "./component/ServiceProviderDashboard/serviceProviderDashboard";
import EditServiceProviderProfile from"./component/ServiceProviderProfile/editServiceProviderProfile";
import Search from "./component/Search/Search";
import SkillVerification from "./component/SkillVerification/skillVerification";
import Login from "./component/Login/login";
export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/customer-signup" exact component={CustomerSignup} />
    <Route
      path="/service-provider-signup"
      exact
      component={ServiceProviderSignup}
    />
    <Route
      path="/service-provider-profile"
      exact
      component={ServiceProviderProfile}
    />
    <Route
      path="/edit-service-provider-profile"
      exact
      component={EditServiceProviderProfile}
    />
    <Route
      path="/service-provider-dashboard"
      exact
      component={ServiceProviderDashboard}
    />
    <Route path="/search" exact component={Search} />
    <Route
      path="/skill-verification-request"
      exact
      component={SkillVerification}
    />
    <Route path="/how-it-works" component={NavBar_HowItWorks} />
    <Route path="/login" component={Login} />
  </Switch>
);
