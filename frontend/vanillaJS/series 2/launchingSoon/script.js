const daysText = document.getElementById("days")
const hoursText = document.getElementById("hours")
const minutesText = document.getElementById("minutes")
const secondsText = document.getElementById("seconds")


let launchDate = new Date(2025, 3, 1);


function printTime() {
    let currentDate = new Date();
    let timeLeft = launchDate - currentDate;

    if (timeLeft <= 0) {
        daysText.innerHTML = 0;
        hoursText.innerHTML = 0;
        minutesText.innerHTML = 0;
        secondsText.innerHTML = 0;
        clearInterval(timerID);
        return;
    }

    let daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    let minutesLeft = Math.floor((timeLeft / (1000 * 60)) % 60);
    let secondsLeft = Math.floor((timeLeft / 1000) % 60);


    daysText.innerHTML = daysLeft < 10 ? `0${daysLeft}` : daysLeft;
    hoursText.innerHTML = hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft;
    minutesText.innerHTML = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
    secondsText.innerHTML = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;
}

let timerID = setInterval(printTime, 1000);