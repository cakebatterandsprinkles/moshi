import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import CloseButton from "../../assets/images/closeButton.png";
import "./Navbar.scss";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [isSignupSubmitted, setIsSignupSubmitted] = useState(false);
  const [isLoginSubmitted, setIsLoginSubmitted] = useState(false);

  const handleLoginOpenModal = () => {
    setIsLogin(true);
    setIsSignup(false);
    setIsInfo(false);
  };

  const handleLoginCloseModal = () => {
    setIsLogin(false);
  };

  const handleLoginSubmit = () => {
    setIsLoginSubmitted(true);
  };

  const handleSignupOpenModal = () => {
    setIsLogin(false);
    setIsSignup(true);
  };

  const handleSignupCloseModal = () => {
    setIsSignup(false);
  };

  const handleSignupSubmit = () => {
    setIsSignupSubmitted(true);
  };

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
                  <input type="email" name="user-email" id="user-email"></input>
                </div>
                <div className="formGroupContainer">
                  <label htmlFor="user-password">Password:</label>
                  <input
                    type="password"
                    name="user-password"
                    id="user-password"
                  ></input>
                </div>
              </form>
            ) : (
              <form className="form">
                <div className="formGroupContainer">
                  <label htmlFor="user-email">E-mail address:</label>
                  <input type="email" name="user-email" id="user-email"></input>
                </div>
                <div className="formGroupContainer">
                  <label htmlFor="user-password">Password:</label>
                  <input
                    type="password"
                    name="user-password"
                    id="user-password"
                  ></input>
                </div>
                <div className="formGroupContainer">
                  <label htmlFor="repeat-password">Repeat password:</label>
                  <input
                    type="password"
                    name="repeat-password"
                    id="repeat-password"
                  ></input>
                </div>
              </form>
            )}

            <button
              onClick={isLogin ? handleLoginSubmit : handleSignupSubmit}
              className="btn"
            >
              {setHeader()}
            </button>
          </div>
          <div className="closingButtonContainer">
            <img
              src={CloseButton}
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

export default Navbar;
