import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Login from "./containers/Auth/Login";
import Home from "./containers/Home";
import Todos from "./containers/Todos";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/todos" component={Todos} />
        <Route path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;
