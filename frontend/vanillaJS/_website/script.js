const moonIcon = document.querySelector(".moon");
const sunIcon = document.querySelector(".sun");

sunIcon.style.display = "none"

moonIcon.addEventListener("click", () => {
    sunIcon.style.display = "block"
    moonIcon.style.display = "none"

    //changing the colors
    document.body.classList.toggle("dark-theme");
})
sunIcon.addEventListener("click", () => {
    sunIcon.style.display = "none"
    moonIcon.style.display = "block"

    document.body.classList.toggle("dark-theme");

    //changing the colors
})
