const optionBTN = document.querySelectorAll(".optionBTN");
const popupContainer = document.querySelector(".popupContainer");
const closeBTN = document.getElementById("close");
const shareBTN = document.getElementById("shareBTN");
const copyBTN = document.getElementById("copyBTN");
const inputBox = document.getElementById("inputBox");


const snackBox = document.querySelector(".snackBox");

optionBTN.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();

        // the fucking logic to get href attribute value
        const link = event.target.closest('a');
        inputBox.value = link.getAttribute('href');

        popupContainer.style.display = "flex";
    });
})


copyBTN.addEventListener("click", (event) => {

    navigator.clipboard.writeText(inputBox.value)

    // creating ui
    let divEle = document.createElement("div");
    divEle.className = "toast";

    let copyIcon = document.createElement("img");
    copyIcon.src = "./success.svg";
    let msg = document.createElement("p");
    msg.innerHTML = "Link copied to clipboard.";

    divEle.appendChild(copyIcon);
    divEle.appendChild(msg);
    snackBox.appendChild(divEle);

    setTimeout(() => {
        divEle.remove();
    }, 6000)
})

shareBTN.addEventListener("click", () => {
    console.log("share clicked");

    let divEle = document.createElement("div");
    divEle.className = "toast";
    divEle.classList.add("share");

    let shareIcon = document.createElement("img");
    shareIcon.src = "./invalid.svg";
    let msg = document.createElement("p");
    msg.innerHTML = "Share feature will be available soon.";

    divEle.appendChild(shareIcon);
    divEle.appendChild(msg);
    snackBox.appendChild(divEle);

    setTimeout(() => {
        divEle.remove();
    }, 6000)
})

closeBTN.addEventListener("click", () => {
    popupContainer.style.display = "none";

})