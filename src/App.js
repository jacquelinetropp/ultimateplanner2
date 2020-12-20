import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./components/layout/Layout";
import Login from "./containers/Auth/Login";
import SignUp from "./containers/Auth/SignUp";
import Home from "./containers/Home";
import Todos from "./containers/Todos/Todos";
import Logout from "./containers/Auth/Logout";
import VerifyEmail from "./containers/Auth/VerifyEmail";
import RecoverPassword from "./containers/Auth/RecoverPassword";
import Profile from "./containers/Auth/Profile";

const App = ({ loggedIn, emailVerified }) => {
  let routes;
  if (loggedIn && !emailVerified) {
    routes = (
      <Switch>
        <Route exact path="/verify-email" component={VerifyEmail} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/verify-email" />
      </Switch>
    );
  } else if (loggedIn && emailVerified) {
    routes = (
      <Switch>
        <Route exact path="/" component={Todos} />
        <Route path="/profile" component={Profile} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/recover" component={RecoverPassword} />
        <Redirect to="/login" />
      </Switch>
    );
  }
  return <Layout>{routes}</Layout>;
};

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid,
  emailVerified: firebase.auth.emailVerified,
});

export default connect(mapStateToProps)(App);
