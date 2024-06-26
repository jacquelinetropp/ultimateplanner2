import React, { Fragment, Suspense } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./components/layouts/Layout";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Logout from "./pages/Auth/Logout";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import RecoverPassword from "./pages/Auth/RecoverPassword";
// import Profile from "./pages/Auth/Profile";
import TodosLayout from "./components/layouts/TodosLayout";
import Loader from "./components/UI/Loader/Loader";
// import Projects from './pages/Projects/Projects';

const Profile = React.lazy(() => import ('./pages/Auth/Profile'));
const Projects = React.lazy(() => import('./pages/Projects/Projects'));


const App = ({ loggedIn, emailVerified }) => {
  let routes;
  // if (loggedIn && !emailVerified) {
  //   routes = (
  //     <Layout>

  //       <Switch>
  //         <Route exact path="/verify-email" component={VerifyEmail} />
  //         <Route path="/logout" component={Logout} />
  //         <Redirect to="/verify-email" />
  //       </Switch>
   
  //     </Layout>
  //   );
  // } else if (loggedIn && emailVerified) {
  //   routes = (
  //     <Suspense fallback={<Loader />}>
  //      <Layout>
  //       <Switch>
 
  //         <Route exact path="/" component={Projects} />
  //         <Route exact path ="/verify-email" 
  //         render={() =>
  //           emailVerified ? <Redirect to="/" /> : <Profile />
  //         }
  //         />
  //         <Route path="/profile" component={Profile} />
  //         <Route path="/logout" component={Logout} />
  //         <Route path="/:id" component={TodosLayout} />
        
  //         <Redirect to="/" />

  //       </Switch>
 
  //       </Layout>
  //     </Suspense>
  //   );
  // } 
  
  if (loggedIn) {
    routes = (
      <Suspense fallback={<Loader />}>
       <Layout>
        <Switch>
 
          <Route exact path="/" component={Projects} />
          <Route exact path ="/verify-email" 
          render={() =>
            emailVerified ? <Redirect to="/" /> : <Profile />
          }
          />
          <Route path="/profile" component={Profile} />
          <Route path="/logout" component={Logout} />
          <Route path="/:id" component={TodosLayout} />
        
          <Redirect to="/" />

        </Switch>
 
        </Layout>
      </Suspense>
    );
  }
  else {
    routes = (
      <Switch>
        <Route exact path="/" component={Login} />
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

export default withRouter(connect(mapStateToProps)(App));
