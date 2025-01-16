let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let second = document.getElementById("second");
let format = document.getElementById("format");


function startTime() {
    let date = new Date();
    let currentHour = date.getHours();
    let currentMinute = date.getMinutes();
    let currentSecond = date.getSeconds();

    let currentFormat;
    if (currentHour > 12) {
        currentFormat = "PM"
        currentHour = currentHour - 12;
    }
    else {
        currentFormat = "AM"
    }

    hour.innerHTML = currentHour < 10 ? `0${currentHour}` : currentHour;
    minute.innerHTML = currentMinute < 10 ? `0${currentMinute}` : currentMinute;
    second.innerHTML = currentSecond < 10 ? `0${currentSecond}` : currentSecond;

    format.innerHTML = currentFormat;
}

window.onload = setInterval(startTime, 1000);

// assignment done