let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("status");
// let playButton = document.querySelector(".fa-play")
// let pauseButton = document.querySelector(".fa-pause")

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        // pauseButton.style.display = "none";
        ctrlIcon.classList.remove("fa-pause")
        ctrlIcon.classList.add("fa-play")

    }
    else {
        song.play();
        ctrlIcon.classList.add("fa-pause")
        ctrlIcon.classList.remove("fa-play")
        // playButton.style.display = "none";
    }
}

if (song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 100)
}
progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause")
    ctrlIcon.classList.remove("fa-play")
}


