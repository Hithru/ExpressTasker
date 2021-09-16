import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage/LandingPage";
import NavBar_HowItWorks from "./component/NavBar/NavBar_HowItWorks";
//import TaskerProfile from "./component/TaskerProfile/TaskerProfile";
import CustomerSignup from "./component/CustomerSignup/customerSignup";
import ServiceProviderSignup from "./component/ServiceProviderSignup/serviceProviderSignup";
import SkillVerification from "./component/SkillVerification/skillVerification";

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
      path="/skill-verification-request"
      exact
      component={SkillVerification}
    />
    <Route path="/how-it-works" component={NavBar_HowItWorks} />
  </Switch>
);
