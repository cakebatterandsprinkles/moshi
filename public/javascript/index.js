const message = document.querySelector('p');
const button = document.querySelector('button');
let synth = window.speechSynthesis;

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

function startListening() {
  recognition.start();
}

function handleUserInput(event) {
  let input = event.results[0][0].transcript;
  message.textContent = input;
  searchWikiArticle(input);
}

function readText(text) {
  let utterThis = new SpeechSynthesisUtterance(text);
  utterThis.voice = speechSynthesis.getVoices()[49];
  synth.speak(utterThis);
}

function searchWikiArticle(input) {
  fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${input}&limit=1&namespace=0&format=json&origin=*`)
    .then(response => response.json())
    .then(data => {
      fetch(`https://en.wikipedia.org/w/api.php?action=query&explaintext&prop=extracts&exintro&titles=${data[1][0]}&format=json&origin=*`)
        .then(response => response.json())
        .then(data => Object.values(data.query.pages)[0].extract)
        .then(articleText => readText(articleText))
    })
}

recognition.addEventListener('result', handleUserInput);
button.addEventListener('click', startListening);