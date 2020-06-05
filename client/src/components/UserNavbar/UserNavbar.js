import React from "react";
import { Link} from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import "./UserNavbar.scss";

const UserNavbar = (props) => {

  const logout = () => {
    fetch("/logout", {
      method: "POST",
      credentials: "include"
    }).then(() => props.removeAuthentication())
  }

  return (
    <div className="navbar__gradient">
      <div className="navbar">
        <Link to="/user/history" className="logo">
          <p>Moshi</p>
        </Link>
        <div className="navbar__subContainer">
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API" target="_blank" className="link">
            <p>Learn More</p>
          </a>
          <Link to="/" className="link" onClick={logout}>
            <p>Logout</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeAuthentication: () => 
      dispatch({
        type: actionTypes.setUserMail,
        payload: { userMail: "" },
      }),
    setError: (errorMessage) =>
      dispatch({
        type: actionTypes.setErrorMessage,
        payload: { errorMessage: errorMessage },
      }),
  };
};

export default connect(null, mapDispatchToProps)(UserNavbar);
