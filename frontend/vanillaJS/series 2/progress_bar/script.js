const percentText = document.getElementById("percent");
let counter = 0;
let progress = 65;


let timerID = setInterval(() => {
    if (counter >= 65) {
        clearInterval(timerID);
    }
    else {
        counter++;
        percentText.innerHTML = counter + "%";
    }
}, 1000 / progress);

