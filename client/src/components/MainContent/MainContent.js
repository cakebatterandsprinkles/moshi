import React, { Component } from "react";
import "./MainContent.scss";

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.startButton = React.createRef();
    this.userSpeech = React.createRef();

    this.startListening = this.startListening.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.readText = this.readText.bind(this);
    this.searchWikiArticle = this.searchWikiArticle.bind(this);
  }

  startListening = () => {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new window.SpeechRecognition();
    recognition.addEventListener("result", this.handleUserInput);
    recognition.start();
  };

  handleUserInput = (event) => {
    const message = this.userSpeech.current;
    let input = event.results[0][0].transcript;
    message.textContent = input;
    this.searchWikiArticle(input);
  };

  readText = (text) => {
    console.log(text);
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterThis = new SpeechSynthesisUtterance(text);

    const voices = synth.getVoices();

    const googleUSVoice = voices.filter(
      (voice) => voice.name === "Google UK English Female"
    )[0];
    if (googleUSVoice) {
      utterThis.voice = googleUSVoice;
    }
    synth.speak(utterThis);
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
          .then((articleText) => this.readText(articleText));
      });
  };

  componentDidMount() {}

  render() {
    return (
      <div className="mainContainer">
        <div className="textWrapper">
          <h1 className="heading">Welcome to Moshi!</h1>
          <h2 className="subheading">
            Learn more about tomatoes when you are preparing your salad!
          </h2>
          <p className="text text--md">
            {" "}
            Moshi uses the Web Speech API, SpeechSynthesis (Text-to-Speech), and
            SpeechRecognition (Asynchronous Speech Recognition.) When your hands
            are occupied with something else, you can press the Start button,
            say something you would want to learn more about, and Mochi will
            bring and read that article to you.
          </p>
          <p className="text text--md">
            {" "}
            It can be used without signing up. If you sign up, you can keep your
            historical data and re-listen the wikipedia articles you want to
            hear again with a single click.
          </p>
        </div>
        <div className="demoWrapper">
          <p className="text text--md">
            After you are ready to start, click the start button and say
            something that you would like to learn more about:
          </p>
          <button
            ref={this.startButton}
            onClick={this.startListening}
            className="btn"
          >
            Start
          </button>
          <p className="text"> You are saying:</p>
          <p ref={this.userSpeech} className="text highlight"></p>
        </div>
      </div>
    );
  }
}

export default MainContent;
