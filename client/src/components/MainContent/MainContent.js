import React, { Component } from "react";

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
      <div>
        <button ref={this.startButton} onClick={this.startListening}>
          Click here to start
        </button>
        <h1> You are saying:</h1>
        <p ref={this.userSpeech}></p>
      </div>
    );
  }
}

export default MainContent;
