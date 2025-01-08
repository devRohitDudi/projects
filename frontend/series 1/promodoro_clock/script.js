const minute = document.getElementById("minute");
const second = document.getElementById("second");
const startBTN = document.getElementById("start");
const pauseBTN = document.getElementById("pause");
const resumeBTN = document.getElementById("resume");
const resetBTN = document.getElementById("reset");

const promoCount = document.querySelector(".promo-count");
const completed = document.getElementById("completed");
const timeType = document.querySelector(".time-type");

//vars
// let promodoros = 0
let workTime = 25 * 60;
let breakTime = 5 * 60;
let timerID = null;
let isRunning = false;
let isPaused = false;
let oneRoundCompleted = false;

let minsHTML = null;
let secsHTML = null;

// running timer
function countDown(time) {
    return () => {
        let mins = Math.floor(time / 60);
        let secs = Math.floor(time % 60);
        minute.innerHTML = mins < 10 ? `0${mins}` : mins;
        second.innerHTML = secs < 10 ? `0${secs}` : secs;
        time--;
        if (time < 0) {
            stopTimer();
            if (!oneRoundCompleted) {
                startTimer(breakTime);
                oneRoundCompleted = true;
                updateTitle("it's break time");
            }
            else {
                saveToLocal();
                setTimeout(updateTitle("Start timer again!"), 2000);
            }
        }
    }
}

//starting the timer by passing time 
const startTimer = (startTime) => {
    if (isRunning === false) {
        timerID = setInterval(countDown(startTime), 1000);
        isRunning = true;
    }
    else {
        // stopTimer(timerID);
        clearInterval(timerID);
        timerID = setInterval(countDown(startTime), 1000);
    }
}

// calling timer function
startBTN.addEventListener("click", () => {
    startTimer(workTime);
    updateTitle("It's work time");
})

//stoping timer
const stopTimer = () => {
    clearInterval(timerID);
    isRunning = false;
}

//function to update title
const updateTitle = (msg) => {
    timeType.textContent = msg;
}

// pause timer
pauseBTN.addEventListener("click", () => {
    stopTimer();
    updateTitle("Timer Paused")
    isPaused = true;
    minsHTML = parseInt(minute.textContent);
    secsHTML = parseInt(second.textContent);
})

//resume timer
resumeBTN.addEventListener("click", () => {
    let resumeTime = (minsHTML * 60) + secsHTML;
    if (isPaused) {
        oneRoundCompleted ? updateTitle("It's break time") : updateTitle("It's work time");
        startTimer(resumeTime);
        isPaused = false;
    }
})

//reset timer
resetBTN.addEventListener("click", () => {
    stopTimer();
    minute.textContent = "25";
    second.textContent = "00";
})

//function to save on  local
const saveToLocal = () => {
    let counts = JSON.parse(localStorage.getItem("promodoros"));

    counts !== null ? counts++ : counts = 1;
    localStorage.setItem("promodoros", JSON.stringify(counts));
    console.log(counts);
}

//show promo count
function showPromo() {
    let counts = JSON.parse(localStorage.getItem("promodoros"));
    if (counts > 0) {
        promoCount.textContent = counts;
        promoCount.style.display = "block";
        completed.style.display = "block";
    }
    updateTitle(`Completed ${counts} Round pomorodo`);
}
showPromo();
