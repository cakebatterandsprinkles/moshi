import React, { Component } from "react";
import "./MainContent.scss";

const synth = window.speechSynthesis;

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.startButton = React.createRef();
    this.userSpeech = React.createRef();

    this.startListening = this.startListening.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.readText = this.readText.bind(this);
    this.searchWikiArticle = this.searchWikiArticle.bind(this);

    this.state = {
      buttonText: "Start",
    };
  }

  startListening = () => {
    let buttonText = this.startButton.current.textContent;
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new window.SpeechRecognition();
    recognition.addEventListener("result", this.handleUserInput);

    if (buttonText === "Stop") {
      recognition.abort();
      synth.cancel();
    } else if (buttonText === "Start") {
      recognition.start();
    }
    this.generateButtonText();
  };

  generateButtonText = () => {
    if (this.state.buttonText === "Start") {
      this.setState({ buttonText: "Stop" });
    } else {
      this.setState({ buttonText: "Start" });
    }
  };

  handleUserInput = (event) => {
    const message = this.userSpeech.current;
    let input = event.results[0][0].transcript;
    message.textContent = input;
    this.searchWikiArticle(input);
  };

  readText = (text) => {
    const buttonText = this.startButton.current.textContent;
    if (buttonText === "Start") {
      synth.cancel();
    } else if (buttonText === "Stop") {
      synth.cancel();
      console.log(text);
      
      const utterThis = new SpeechSynthesisUtterance(text);

      const voices = synth.getVoices();

      const googleUSVoice = voices.filter(
        (voice) => voice.name === "Google UK English Female"
      )[0];
      if (googleUSVoice) {
        utterThis.voice = googleUSVoice;
      }
      synth.speak(utterThis);
    }
  };

  searchWikiArticle = (input) => {
    fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${input}&limit=1&namespace=0&format=json&origin=*`
    )
      .then((response) => response.json())
      .then((data) => {
        fetch(
          `https://en.wikipedia.org/w/api.php?action=query&explaintext&prop=extracts&titles=${data[1][0]}&format=json&origin=*`
        )
          .then((response) => response.json())
          .then((data) => Object.values(data.query.pages)[0].extract)
          .then((articleText) => this.readText(articleText.replace(/==/g, "").substr(0, 5000)));
      });
  };

  render() {
    return (
      <div className="mainContainer">
        <div className="innerContainer">
          <div className="textWrapper">
            <p className="heading">
              Welcome to <span className="textLogo">Moshi!</span>
            </p>
            <p className="subheading">
              Learn more about tomatoes when preparing your salad!
            </p>
            <p className="text--sm">
              {" "}
              Press the Start button, say something you would want to learn more
              about, and <span className="textLogo">Moshi</span> will bring and
              read that article to you.
            </p>
          </div>
          <div className="demoWrapper">
            <button
              ref={this.startButton}
              onClick={this.startListening}
              className="startBtn"
            >
              {this.state.buttonText}
            </button>
            <p className="text"> You are saying:</p>
            <p ref={this.userSpeech} className="text highlight">-</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MainContent;
