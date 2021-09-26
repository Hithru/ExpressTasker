import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage/LandingPage";
import NavBar_HowItWorks from "./component/NavBar/NavBar_HowItWorks";
//import TaskerProfile from "./component/TaskerProfile/TaskerProfile";
import CustomerSignup from "./component/CustomerSignup/customerSignup";
import ServiceProviderSignup from "./component/ServiceProviderSignup/serviceProviderSignup";
import Search from "./component/Search/Search";
import SkillVerification from "./component/SkillVerification/skillVerification";
import CustomerLogin from "./component/CustomerLogin/customerLogin";
import ServiceProviderLogin from "./component/ServiceProviderLogin/serviceProviderLogin";
import CustomerOrderTable from "./component/CustomerOrderTable/customerOrderTable";
import LogOut from "./component/LogOut/logout";
import CustomerReview from "./component/Review/customerReview";
export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/customer-signup" exact component={CustomerSignup} />
    <Route
      path="/service-provider-signup"
      exact
      component={ServiceProviderSignup}
    />
    <Route path="/search" exact component={Search} />
    <Route
      path="/skill-verification-request"
      exact
      component={SkillVerification}
    />
    <Route path="/logout" component={LogOut} />
    <Route path="/how-it-works" component={NavBar_HowItWorks} />
    <Route path="/customer-login" component={CustomerLogin} />
    <Route path="/customer-orders" component={CustomerOrderTable} />
    <Route path="/service-provider-login" component={ServiceProviderLogin} />
    <Route path="/customer-review" component={CustomerReview} />
  </Switch>
);
