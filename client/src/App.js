import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainContent from "./components/MainContent/MainContent";
import History from "./containers/History/History";
import PageNotFound from "./components/404/404";
import * as actionTypes from "./store/actions/actionTypes";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Layout isAuthenticated={true}>
        <Switch>
          <Route exact path="/" component={MainContent} />
          {/* <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/login" component={LoginForm} /> */}
          <Route exact path="/history" component={History} />
          <Route path="/" component={PageNotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
