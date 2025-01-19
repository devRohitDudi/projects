const okBTN = document.getElementById("ok");
const submitBTN = document.querySelector(".submitBTN");
const popupContent = document.querySelector(".popupContent");

console.log("connected");

submitBTN.addEventListener("click", () => {
    console.log("submit clicked");
    popupContent.style.display = "flex";

})
okBTN.addEventListener("click", () => {
    popupContent.style.display = "none";
})