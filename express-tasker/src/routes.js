import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./component/LandingPage/LandingPage";
import NavBar_HowItWorks from "./component/NavBar/NavBar_HowItWorks";
import CustomerSignup from "./component/CustomerSignup/customerSignup";
import ServiceProviderSignup from "./component/ServiceProviderSignup/serviceProviderSignup";
import ServiceProviderProfile from "./component/ServiceProviderProfile/serviceProviderProfile";
import ServiceProviderCard from "./component/ServiceProviderCard/serviceProviderCard";
import CustomerProfile from "./component/CustomerProfile/customerProfile";
import EditServiceProviderProfile from "./component/ServiceProviderProfile/editServiceProviderProfile";
import ServiceProviderComplaint from "./component/ServiceProviderProfile/serviceProviderComplaint";
import CustomerComplaint from "./component/CustomerProfile/customerComplaint";
import Search from "./component/Search/Search";
import SkillVerification from "./component/SkillVerification/skillVerification";
import CustomerLogin from "./component/CustomerLogin/customerLogin";
import ServiceProviderLogin from "./component/ServiceProviderLogin/serviceProviderLogin";
import CustomerOrderTable from "./component/CustomerOrderTable/customerOrderTable";
import LogOut from "./component/LogOut/logout";
import CustomerReview from "./component/CustomerReview/customerReview";
import ServiceProviderRating from "./component/ServiceProviderRating/serviceProviderRating";
import CreateOrder from "./component/CreateOrder/createOrder";
import ServiceProviderOrderTable from "./component/ServiceProviderOrderTable/serviceProviderOrderTable";
import auth from "../src/services/customerAuth";
import Messenger from "./component/Messenger/Messenger";

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
    <Route path="/customer-profile" exact component={CustomerProfile} />
    <Route
      path="/service-provider-card/:id"
      exact
      component={ServiceProviderCard}
    />
    <Route
      path="/edit-service-provider-profile"
      exact
      component={EditServiceProviderProfile}
    />
     <Route
      path="/service-provider-complaint"
      exact
      component={ServiceProviderComplaint}
    />
    <Route
      path="/customer-complaint"
      exact
      component={CustomerComplaint}
    />
    <Route path="/search">
      {!auth.getCurrentUser() ? <LandingPage /> : <Search />}
    </Route>
    <Route
      path="/skill-verification-request"
      exact
      component={SkillVerification}
    />
    <Route path="/logout" component={LogOut} />
    <Route path="/how-it-works" component={NavBar_HowItWorks} />
    <Route path="/customer-login" component={CustomerLogin} />
    <Route path="/customer-orders" component={CustomerOrderTable} />
    <Route
      path="/service-provider-orders"
      component={ServiceProviderOrderTable}
    />
    <Route path="/service-provider-login" component={ServiceProviderLogin} />
    <Route
      path="/service-provider-rating/:id"
      component={ServiceProviderRating}
    />
    <Route path="/customer-review/:id" component={CustomerReview} />
    <Route path="/create-order/:id/:name" component={CreateOrder} />
    <Route path="/messenger" component={Messenger} />
  </Switch>
);
