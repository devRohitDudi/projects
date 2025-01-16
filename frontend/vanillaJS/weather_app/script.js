const inputBox = document.getElementById("inputBox");
const searchBTN = document.getElementById("search");
const temprature = document.getElementById("temprature");
const feelsLike = document.getElementById("feelsLike");
const placeName = document.getElementById("location");
const humidityPercent = document.getElementById("humidityPercent");
const windSpeed = document.getElementById("windSpeed");
const weatherSVG = document.getElementById("weatherSVG");
const errorMessage = document.getElementById("errorMessage")

const weatherType = document.querySelector(".weatherType");

const apiKey = "704392d5ea18629ab2063927069cbcd4";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric"


const mist = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M160-200q-17 0-28.5-11.5T120-240q0-17 11.5-28.5T160-280h400q17 0 28.5 11.5T600-240q0 17-11.5 28.5T560-200H160Zm560 0q-17 0-28.5-11.5T680-240q0-17 11.5-28.5T720-280h80q17 0 28.5 11.5T840-240q0 17-11.5 28.5T800-200h-80ZM160-360q-17 0-28.5-11.5T120-400q0-17 11.5-28.5T160-440h80q17 0 28.5 11.5T280-400q0 17-11.5 28.5T240-360h-80Zm240 0q-17 0-28.5-11.5T360-400q0-17 11.5-28.5T400-440h400q17 0 28.5 11.5T840-400q0 17-11.5 28.5T800-360H400ZM160-520q-17 0-28.5-11.5T120-560q0-17 11.5-28.5T160-600h440q17 0 28.5 11.5T640-560q0 17-11.5 28.5T600-520H160Zm600 0q-17 0-28.5-11.5T720-560q0-17 11.5-28.5T760-600h40q17 0 28.5 11.5T840-560q0 17-11.5 28.5T800-520h-40ZM160-680q-17 0-28.5-11.5T120-720q0-17 11.5-28.5T160-760h200q17 0 28.5 11.5T400-720q0 17-11.5 28.5T360-680H160Zm360 0q-17 0-28.5-11.5T480-720q0-17 11.5-28.5T520-760h280q17 0 28.5 11.5T840-720q0 17-11.5 28.5T800-680H520Z"/></svg>`
const sunny = `./icons/animated/day.svg`
const haze = `./icons/static/cloudy-day-1.svg`
const cloudy = `./icons/animated/cloudy.svg`
const foggy = `./icons/static/weather-fog-svgrepo-com.svg`
const night = `./icons/animated/night.svg`
const rainySunny = `./icons/animated/rainy-1.svg`
const rainy = `./icons/animated/rainy-7.svg`
const snowySunny = `./icons/animated/snowy-1.svg`
const snowy = `./icons/animated/snowy-6.svg`
const thunder = `./icons/animated/thunder.svg`
const drizzle = `./icons/animated/rainy-4.svg`


async function checkWeather(place) {
    try {
        const response = await fetch(apiURL + `&q=${place}` + `&appid=${apiKey}`);
        let data = await response.json();
        updateData(data);
        updateIcon(data);
        setMessage(place);
    }
    catch (e) {
        errorMessage.innerHTML = "Can't find place. Enter correct name"
    }
}

// to set the found message
function setMessage(place) {
    let duration = 3;
    errorMessage.innerHTML = `Weather in ${place}? On it!`;
    let timer = setInterval(() => {
        duration--;
        if (duration == 0) {
            clearInterval(timer);
            errorMessage.innerHTML = "";
        }
    }, 1000)
}


// update the details
const updateData = (data) => {
    temprature.innerHTML = data.main.temp + "° C";
    feelsLike.innerHTML = `Feels like: ${data.main.feels_like}° C`;
    placeName.innerHTML = data.name;
    humidityPercent.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + " km/h";
}

// updating the main icon
const updateIcon = (data) => {
    if (data.weather[0].main == "Haze") {
        weatherSVG.src = haze;
    }
    else if (data.weather[0].main == "Clouds") {
        weatherSVG.src = cloudy;
    }
    else if (data.weather[0].main == "Clear") {
        weatherSVG.src = sunny;
    }
    else if (data.weather[0].main == "Rain") {
        weatherSVG.src = rainy;
    }
    else if (data.weather[0].main == "Drizzle") {
        weatherSVG.src = drizzle;
    }
    else if (data.weather[0].main == "Mist") {
        weatherSVG.src = mist;
    }
    else if (data.weather[0].main == "Fog") {
        weatherSVG.src = foggy;
    }
}

searchBTN.addEventListener("click", () => {
    if (inputBox.value == "") { alert("Enter location. idiot!"); return; };
    checkWeather(inputBox.value);
})

document.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        if (inputBox.value == "") { alert("Enter location. idiot!"); return; };
        checkWeather(inputBox.value);
    }
})

window.onload(checkWeather("jaipur"))