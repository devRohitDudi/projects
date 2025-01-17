const successBTN = document.getElementById("success");
const invalidBTN = document.getElementById("invalid");
const errorBTN = document.getElementById("error");

const snackBox = document.querySelector(".snackBox");
const newError = document.querySelector(".newError");



function showNotification(message) {
    let divEle = document.createElement("div");
    divEle.className = "newError";
    let pText = document.createElement("p");
    let imgBox = document.createElement("img");

    if (message === "success") {
        pText.textContent = "Successfully submitted!";
        imgBox.src = "./success.svg";
        divEle.classList.add("success");
    }
    else if (message === "invalid") {
        pText.textContent = "Invalid input, try again!";
        imgBox.src = "./invalid.svg";
        divEle.classList.add("invalid");

    }
    else if (message === "error") {
        pText.textContent = "Error occured!";
        imgBox.src = "./error.svg";
        divEle.classList.add("error");
    }

    divEle.appendChild(imgBox);
    divEle.appendChild(pText);
    snackBox.appendChild(divEle);

    setTimeout(() => {
        divEle.remove();
    }, 6000)
}


successBTN.addEventListener("click", () => {
    showNotification("success")
});
invalidBTN.addEventListener("click", () => {
    showNotification("invalid")
});
errorBTN.addEventListener("click", () => {
    showNotification("error")
});
