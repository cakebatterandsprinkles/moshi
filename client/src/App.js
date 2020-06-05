import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./components/Layout/Layout";
import MainContent from "./components/MainContent/MainContent";
import History from "./containers/History/History";
import PageNotFound from "./components/404/404";
import * as actionTypes from "./store/actions/actionTypes";
import "./App.scss";

const App = (props) => {
  const getUser = () => {
  fetch("/user/history", {
    credentials: "include",
  })
    .then((blob) => blob.json())
    .then((response) => {
      props.setUserData(response);
    })
    .catch(() => {});
};

  useEffect(getUser, []);

  return (
    <BrowserRouter>
      <Layout isAuthenticated={props.isAuthenticated}>
        <Switch>
          <Route exact path="/" component={MainContent} />
          <Route exact path="/user/history" component={History} />
          <Route path="/" component={PageNotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (userMail) =>
      dispatch({
        type: actionTypes.setUserMail,
        payload: { userMail: userMail },
      }),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.userMail !== "",
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
