const message = document.querySelector('p');
let synth = window.speechSynthesis;


window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function handleUserInput(event) {
  let input = event.results[0][0].transcript;
  message.textContent = input;
  let utterThis = new SpeechSynthesisUtterance(input);
  synth.speak(utterThis);
}

recognition.addEventListener('result', handleUserInput);