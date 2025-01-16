const successBTN = document.getElementById("success");
const invalidBTN = document.getElementById("invalid");
const errorBTN = document.getElementById("error");

const snackBox = document.querySelector(".snackBox");
const newError = document.querySelector(".newError");



let invalidSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" fill="yellow" viewBox="0 -960 960 960">
                    <path
                        d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>`
let errorSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" fill="red" viewBox="0 -960 960 960">
                    <path
                        d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>`

let successSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" fill="green" viewBox="0 -960 960 960"><path d="m381-240 424-424-57-56-368 367-169-170-57 57 227 226Zm0 113L42-466l169-170 170 170 366-367 172 168-538 538Z" /></svg>`


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
    removeNotification(divEle);


    setTimeout(() => {
        divEle.remove();
    }, 6000)
}

function removeNotification(divEle) {
    let duration = 3;

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
