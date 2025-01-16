const inputH = document.getElementById("hours");
const inputM = document.getElementById("minutes");
const inputS = document.getElementById("seconds");
const statusP = document.getElementById("status");
const startBTN = document.getElementById("start");
const pauseBTN = document.getElementById("pause");
const resetBTN = document.getElementById("reset");


let timerID;
let isRunning = false;



function updateTime() {
    let hrs = inputH.value;
    let mins = inputM.value;
    let secs = inputS.value;
    secs--;

    if (secs < 0) {
        if (mins > 0) {
            secs = 59;
            mins--;
            if (mins < 0) {
                if (hrs > 0) {
                    mins = 59;
                    hrs--;
                }
                else {
                    alert("Your time is complete!")
                    clearInterval(timerID);
                    isRunning = false;
                    inputH.value = 0;
                    inputM.value = 0;
                    inputS.value = 0;
                }
            }
        }
    }
    if (secs == 0 && mins == 0) {
        if (hrs > 0) {
            mins = 59;
            hrs--;
        }
    }

    showTime(hrs, mins, secs);

    if (hrs <= 0 && mins <= 0 && secs <= 0) {
        clearInterval(timerID);
        isRunning = false;
        inputH.value = 0;
        inputM.value = 0;
        inputS.value = 0;
        alert("Your time is complete!")

    }
}


// display the time
function showTime(hrs, mins, secs) {
    inputH.value = hrs;
    inputM.value = mins;
    inputS.value = secs;

    // inputH.value = hrs < 10 ? `${parseInt(0)}${hrs}` : hrs;
    // inputM.value = mins < 10 ? `0${mins}` : mins;
    // inputS.value = secs < 10 ? `0${secs}` : secs;

}

// main interval  logic
function startTimer(message) {

    statusP.innerHTML = message;
    timerID = setInterval(() => {
        updateTime();
        isRunning = true;
    }, 1000);
}


// pausing the timer
function pauseTimer() {
    if (inputH.value <= 0 && inputM.value <= 0 && inputS.value <= 0) {
        shortMessage("Nothing to pause, Restart the timer!")
    }
    if (isRunning) {
        clearInterval(timerID);
        isRunning = false;
        statusP.innerHTML = "paused!";
        pauseBTN.innerHTML = "Resume";
    }
    else {
        startTimer("resuming...");
        pauseBTN.innerHTML = "Pause";
    }
}



// reset the timer
function resetTimer() {
    if (isRunning) {
        clearInterval(timerID);
        isRunning = false;
        statusP.innerHTML = "paused!";
        shortMessage("Reset Successful!")

        inputH.value = 0;
        inputM.value = 0;
        inputS.value = 0;
    }
    else {
        shortMessage("Already Reset!")
    }
}

function shortMessage(message) {
    statusP.innerHTML = message;

    let duration = 2;
    let newTimer = setInterval(() => {
        duration--;
        if (duration < 0) {
            clearInterval(newTimer);
            duration = 2;
            statusP.innerHTML = "Set your time!";
        }
    }, 1000)
}



//listening click buttons events
startBTN.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timerID);
        isRunning = false;
    }
    if (inputH.value > 0) {
        inputH.value--;
        inputM.value = 59;
    }
    startTimer("Running...");
})

pauseBTN.addEventListener("click", () => {
    pauseTimer();
})

resetBTN.addEventListener("click", () => {
    resetTimer();
})