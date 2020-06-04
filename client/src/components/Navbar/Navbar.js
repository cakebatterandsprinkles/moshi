import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import Modal from "react-modal";
import axios from "axios";
import CloseButton from "../../assets/images/closeButton.png";
import "./Navbar.scss";

const Navbar = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleLoginOpenModal = () => {
    setIsLogin(true);
    setIsSignup(false);
    setIsInfo(false);
  };

  const handleLoginCloseModal = () => {
    setIsLogin(false);
  };

  const handleLoginSubmit = () => {
    axios
      .post(
        "/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        props.setUserData(email);
        props.history.push(`/user/history`);
        handleLoginCloseModal();
        handleSignupCloseModal();
      })
      .catch((error) => {
        if (error.response) {
          props.setError(error.response.data);
        }
      });
  }

  const handleSignupOpenModal = () => {
    setIsLogin(false);
    setIsSignup(true);
  };

  const handleSignupCloseModal = () => {
    setIsSignup(false);
  };

  const handleSignupSubmit = () => {
        axios
      .post("/signup", {
        email: email,
        password: password,
        repeatPassword: repeatPassword,
      })
      .then((response) => {
          handleLoginSubmit();
      })
      .catch((error) => {
        if (error.response) {
          props.setError(error.response.data);
        }
      });
  }


  const handleOpenInfoModal = () => {
    setIsInfo(true);
  };

  const handleCloseInfoModal = () => {
    setIsInfo(false);
  };

  const setHeader = () => {
    if (isLogin && !isSignup) {
      return "Login";
    } else if (!isLogin && isSignup) {
      return "Sign up";
    }
  };

  const setSubText = () => {
    if (isLogin && !isSignup) {
      return "Don't have an account?";
    } else if (!isLogin && isSignup) {
      return "Already have an account?";
    }
  };

  const setLink = () => {
    if (isLogin && !isSignup) {
      return "Sign up";
    } else if (!isLogin && isSignup) {
      return "Login";
    }
  };

  const renderModalContent = () => {
    return isInfo ? (
      <Fragment>
        <div className="modalMainContainer">
          <div className="modal__content">
            <div>
              <div className="flexContainerRow">
                <div className="infoIconWrapper">
                  <p className="infoIcon">i</p>
                </div>
                <p className="text--sm italic">
                  {" "}
                  <span className="textLogo">Moshi</span> can be used without
                  signing up.
                </p>
              </div>
              <div className="closingButtonContainer">
                <img
                  src={CloseButton}
                  alt="Close button"
                  className="closingButton"
                  onClick={handleCloseInfoModal}
                />
              </div>
            </div>
            <p className="text--sm">
              {" "}
              If you sign up, you can keep your historical data and re-listen
              the wikipedia articles you want to hear again with a single click.
            </p>
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="modalMainContainer">
          <div className="modal__content">
            <p className="modal__content__heading">{setHeader()}</p>
            <p className="modal__subText">{setSubText()}</p>
            <Link
              to="/"
              className="modal__subLink"
              onClick={isLogin ? handleSignupOpenModal : handleLoginOpenModal}
            >
              {setLink()}
            </Link>
            {isLogin ? (
              <form className="form">
                <div className="formGroupContainer">
                  <label htmlFor="user-email">E-mail address:</label>
                  <input type="email" name="user-email" id="user-email" onChange={event => setEmail(event.target.value)}></input>
                </div>
                <div className="formGroupContainer">
                  <label htmlFor="user-password">Password:</label>
                  <input
                    type="password"
                    name="user-password"
                    id="user-password"
                    onChange={event => setPassword(event.target.value)}
                  ></input>
                </div>
              </form>
            ) : (
              <form className="form">
                <div className="formGroupContainer">
                  <label htmlFor="user-email">E-mail address:</label>
                  <input type="email" name="user-email" id="user-email" onChange={event => setEmail(event.target.value)}></input>
                </div>
                <div className="formGroupContainer">
                  <label htmlFor="user-password">Password:</label>
                  <input
                    type="password"
                    name="user-password"
                    id="user-password"
                    onChange={event => setPassword(event.target.value)}
                  ></input>
                </div>
                <div className="formGroupContainer">
                  <label htmlFor="repeat-password">Repeat password:</label>
                  <input
                    type="password"
                    name="repeat-password"
                    id="repeat-password"
                    onChange={event => setRepeatPassword(event.target.value)}
                  ></input>
                </div>
              </form>
            )}

            <button
              type="submit"
              onClick={isLogin ? handleLoginSubmit : handleSignupSubmit}
              className="btn"
            >
              {setHeader()}
            </button>
          </div>
          <div className="closingButtonContainer">
            <img
              src={CloseButton}
              alt="Close button"
              className="closingButton"
              onClick={isLogin ? handleLoginCloseModal : handleSignupCloseModal}
            />
          </div>
        </div>
      </Fragment>
    );
  };

  let currentModal = renderModalContent();

  return (
    <div className="navbar__gradient">
      <div className="navbar">
        <Link to="/" className="logo">
          <p>Moshi</p>
        </Link>
        <div className="navbar__subContainer">
          <Link to="/" className="link">
            <p onClick={handleSignupOpenModal}>Sign up</p>
          </Link>
          <Link to="/" className="link">
            <p onClick={handleLoginOpenModal}>Login</p>
          </Link>
          <Link to="/" className="infolink" onClick={handleOpenInfoModal}>
            <p>i</p>
          </Link>
        </div>
        <Modal
          isOpen={isLogin || isSignup || isInfo}
          onRequestClose={
            isInfo
              ? handleCloseInfoModal
              : isSignup
              ? handleSignupCloseModal
              : handleLoginCloseModal
          }
          className="modal"
          overlayClassName="overlay"
          ariaHideApp={false}
        >
          {currentModal}
        </Modal>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (userMail) =>
      dispatch({
        type: actionTypes.setUserMail,
        payload: { userMail: userMail },
      }),
    setError: (errorMessage) =>
      dispatch({
        type: actionTypes.setErrorMessage,
        payload: { errorMessage: errorMessage },
      }),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Navbar));
