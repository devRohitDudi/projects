const selectBox = document.querySelector(".selectBox");
const listItem = document.querySelectorAll(".item");
const selectInput = document.getElementById("selectInput");
const dropIcon = document.getElementById("dropIcon");
const allList = document.querySelector(".list");
allList.style.display = "none"


listItem.forEach((item) => {
    item.addEventListener("click", () => {
        selectInput.innerHTML = item.children[1].textContent;
        allList.style.display = "none"
        isRotate = false;
        dropIcon.style.rotate = "0deg";

    })
})

let isRotate = false;
selectBox.addEventListener("click", () => {
    if (isRotate) {
        isRotate = false;
        dropIcon.style.rotate = "0deg";
        allList.style.display = "none"

    }
    else {
        dropIcon.style.rotate = "180deg";
        isRotate = true;
        allList.style.display = "block"
    }
})
