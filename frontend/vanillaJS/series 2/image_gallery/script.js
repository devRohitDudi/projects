const scrollContainer = document.querySelector(".gallery");
const nextBTN = document.getElementById("next");
const backBTN = document.getElementById("back");


scrollContainer.addEventListener("wheel", (e) => {
    // e.preventDefault();
    scrollContainer.scrollLeft += e.deltaY;
    scrollContainer.style.scrollBehaviour = "auto";
})

nextBTN.addEventListener("click", (e) => {
    scrollContainer.scrollLeft += 900;
})
backBTN.addEventListener("click", (e) => {
    scrollContainer.scrollLeft -= 900;
})