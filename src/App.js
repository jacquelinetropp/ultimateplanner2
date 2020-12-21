import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./components/layouts/Layout";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home";
import Logout from "./pages/Auth/Logout";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import RecoverPassword from "./pages/Auth/RecoverPassword";
import Profile from "./pages/Auth/Profile";
import TodosLayout from "./components/layouts/TodosLayout";

const App = ({ loggedIn, emailVerified }) => {
  let routes;
  if (loggedIn && !emailVerified) {
    routes = (
      <Layout>
        <Switch>
          <Route exact path="/verify-email" component={VerifyEmail} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/verify-email" />
        </Switch>
      </Layout>
    );
  } else if (loggedIn && emailVerified) {
    routes = (
      <Layout>
        <Switch>
          <Route exact path="/" component={TodosLayout} />
          <Route path="/profile" component={Profile} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/recover" component={RecoverPassword} />
        <Redirect to="/login" />
      </Switch>
    );
  }
  return <Fragment>{routes}</Fragment>;
};

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid,
  emailVerified: firebase.auth.emailVerified,
});

export default connect(mapStateToProps)(App);
