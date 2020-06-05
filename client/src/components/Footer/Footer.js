import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footerContainer">
      <p>
        <span className="textLogo">Moshi</span> is an experimental app that uses SpeechSynthesis and
        SpeechRecognition functions of the Web Speech API. Check Wikipedia API for article resource.
      </p>
    </div>
  );
};

export default Footer;
