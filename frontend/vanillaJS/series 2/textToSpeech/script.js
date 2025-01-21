const inputArea = document.getElementById("input");
const listenBTN = document.getElementById("listen");

let speech = new SpeechSynthesisUtterance();


let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
        voiceSelect.add(option);
    });
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
})



// function populateVoices() {
//     voices = window.speechSynthesis.getVoices();
//     // Clear previous options and add available voices
//     voiceSelect.innerHTML = '';
//     voices.forEach((voice, i) => {
//         let option = new Option(voice.name, i);
//         voiceSelect.add(option);
//     });
//     // Set the default voice
//     speech.voice = voices[0];
// }

// // Event listener for voice selection change
// voiceSelect.addEventListener("change", () => {
//     speech.voice = voices[voiceSelect.value];
// });


listenBTN.addEventListener("click", () => {
    console.log(inputArea.value); // it's correct
    console.log(speech);
    speech.lang = 'en-US'; // You can change the language here

    speech.lang = "english";
    speech.text = inputArea.value;
    window.speechSynthesis.speak(speech);
})


// // Ensure voices are loaded properly
// if (window.speechSynthesis.onvoiceschanged !== undefined) {
//     window.speechSynthesis.onvoiceschanged = populateVoices;
// } else {
//     // For some browsers that do not trigger `onvoiceschanged`, try populating immediately
//     populateVoices();
// }