let day = document.getElementById("day");
let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let second = document.getElementById("second");

let dayText = document.querySelector(".day-text");
let hourText = document.querySelector(".hour-text");
let minuteText = document.querySelector(".minute-text");
let secondText = document.querySelector(".second-text");


const updateCountDown = (targetTime) => {

    const currentTime = new Date();
    const timeDifference = targetTime - currentTime;

    // console.log(timeDifference);

    let calcSeconds = Math.floor(timeDifference / 1000) % 60;
    let calcMinutes = Math.floor(timeDifference / 1000 / 60) % 60;
    let calcHours = Math.floor(timeDifference / 1000 / 60 / 60) % 24;
    let calcDays = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

    second.innerHTML = calcSeconds < 10 ? `0${calcSeconds}` : calcSeconds;
    minute.innerHTML = calcMinutes < 10 ? `0${calcMinutes}` : calcMinutes;
    hour.innerHTML = calcHours < 10 ? `0${calcHours}` : calcHours;
    day.innerHTML = calcDays < 10 ? `0${calcDays}` : calcDays;

    function setEnglish() {
        if (calcSeconds > 1) {
            secondText.innerHTML = "Seconds";
        }
        if (calcMinutes > 1) {
            minuteText.innerHTML = "Minutes";
        }
        if (calcHours > 1) {
            hourText.innerHTML = "Hours";
        }
        if (calcDays > 1) {
            dayText.innerHTML = "Days";
        }
    }
    setEnglish();
}

function setCountDown(targetDate) {
    setInterval(() => { updateCountDown(targetDate) }, 1000);
}

const targetDate = new Date("February 01 2025 01:00");
setCountDown(targetDate);
