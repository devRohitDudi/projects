const hoursP = document.getElementById("hours");
const minutesP = document.getElementById("minutes");
const secondsP = document.getElementById("seconds");
const statusP = document.getElementById("status");
const startBTN = document.getElementById("start");
const pauseBTN = document.getElementById("pause");
const resetBTN = document.getElementById("reset");


let hours = 0;
let minutes = 0;
let seconds = 0;
let isRunning = false;
let timerID;


// time update
function updateTime() {
    seconds++;
    if (seconds > 60) {
        minutes++;
        seconds = 0;

        if (minutes > 60) {
            hours++;
            minutes = 0;
        }
    }
    hoursP.innerHTML = hours < 10 ? `0${hours}` : hours;
    minutesP.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
    secondsP.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
}


// starting interval
function startTimer(message) {
    statusP.innerHTML = message;

    timerID = setInterval(() => {
        updateTime(timerID);
        isRunning = true;
    }, 1000)
}


// pausing and resuming the timer
function pauseTimer() {

    //handling case if timer is reset than don't start it by pause button
    if (seconds == 0 && minutes == 0) {
        shortMessage("Cannot pause timer is reseted!");
        return;
    }

    if (isRunning) {
        clearInterval(timerID);
        isRunning = false;
        statusP.innerHTML = "paused!";
        pauseBTN.innerHTML = "Resume";

    }
    else {
        startTimer("Resuming!");
        pauseBTN.innerHTML = "Pause";
    }
}

function resetTimer() {
    if (isRunning) {
        clearInterval(timerID);
        isRunning = false;
        seconds = 0;
        minutes = 0;
        hours = 0;
        hoursP.innerHTML = "00";
        minutesP.innerHTML = "00";
        secondsP.innerHTML = "00";
        shortMessage("Reset successful!")

    }
    else {
        shortMessage("Already reset!");
        // handling case if interval is already cleared by pause button
        hoursP.innerHTML = "00";
        minutesP.innerHTML = "00";
        secondsP.innerHTML = "00";
    }
}


// short message duration haha!
let duration = 2;
let newTimer;
function shortMessage(message) {
    statusP.innerHTML = message;

    newTimer = setInterval(function () {
        duration--;
        if (duration == 0) {
            clearInterval(newTimer);
            statusP.innerHTML = "Start again!";
            duration = 2;
        }
    }, 1000)
}


// start click event listener
startBTN.addEventListener("click", () => {
    let message = "Runnnig!";
    if (isRunning) {
        clearInterval(timerID);
        isRunning = false;
        seconds = 0;
        minutes = 0;
        hours = 0;
        message = "Running again!"
    }
    startTimer(message);
    //handling case if the button name is already "resume"
    pauseBTN.innerHTML = "Pause";
})

// pause click event listener
pauseBTN.addEventListener("click", () => {
    pauseTimer();
})

// listening reset button event
resetBTN.addEventListener("click", () => {
    resetTimer();
})

// assignment completed