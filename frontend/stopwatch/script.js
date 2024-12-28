let timeScreen = document.querySelector(".time");
let startbtn = document.getElementById("start");
let stopbtn = document.getElementById("stop");
let resetbtn = document.getElementById("reset");


let msec = 0;
let secs = 0;
let mins = 0;

let timerId = null;

startbtn.addEventListener("click", () => {
    if (timerId !== null) {
        clearInterval(timerId);
    }

    timerId = setInterval(startTimer, 10)
})

stopbtn.addEventListener("click", () => {
    clearInterval(timerId);
})

resetbtn.addEventListener("click", () => {
    clearInterval(timerId);
    secs = 0;
    msec = 0;
    mins = 0;
    timeScreen.innerHTML = "00 : 00 : 00";
})

function startTimer() {
    msec++;
    if (msec >= 100) {
        secs++;
        msec = 0;
        if (secs >= 60) {
            mins++;
            if (mins >= 60) {
                clearInterval(timerId);
                alert("your time capacity is over. please restart the timer");

            }
        }
    }

    let msecSTR = msec < 10 ? `0${msec}` : msec;
    let secsSTR = secs < 10 ? `0${secs}` : secs;
    let minsSTR = mins < 10 ? `0${mins}` : mins;

    timeScreen.innerHTML = `${minsSTR} : ${secsSTR} : ${msecSTR}`;
}