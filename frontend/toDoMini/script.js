let inputBox = document.getElementById("inputBox");
let addBTN = document.getElementById("addBTN");
let ulBox = document.getElementById("toDoList");
const errorMessage = document.getElementById("errorMessage");

const addToDo = () => {
    let input = document.createElement("input");
    input.type = "checkbox";
    input.className = 'checkBox';
    let paragraph = document.createElement("p");

    paragraph.innerHTML = inputBox.value;
    inputBox.value = "";

    let textDiv = document.createElement("div");
    textDiv.className = "toDoText";

    textDiv.appendChild(input);
    textDiv.appendChild(paragraph);

    let removeBTN = document.createElement("p");
    removeBTN.className = "remove";
    removeBTN.textContent = "Remove";

    let liElement = document.createElement("li");
    liElement.className = "toDoBox";

    liElement.appendChild(textDiv);
    liElement.appendChild(removeBTN);

    ulBox.appendChild(liElement);
    saveToLocal()
}

//save to local storage
function saveToLocal() {
    localStorage.setItem("dataList", ulBox.innerHTML);
}

//show local on load
function showData() {
    ulBox.innerHTML = localStorage.getItem("dataList");
}
showData();



// add button event 
addBTN.addEventListener("click", () => {
    if (inputBox.value.length == 0) {
        alert("Empty value. idiot!");
        return;
    }
    addToDo()
})

//enter button functionality
document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        if (inputBox.value.length == 0) {
            alert("Empty value. idiot!");
            return;
        }
        addToDo()
    }
    showMessage()
})

function showMessage() {
    let duration = 2;
    errorMessage.innerHTML = "press enter to save";
    let timerID = setInterval(() => {
        duration--;
        if (duration == 0) {
            errorMessage.innerHTML = "";
            clearInterval(timerID);
        }
    }, 1000)
}

// operations
ulBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
        saveToLocal();
    }
})

ulBox.addEventListener("change", (e) => {
    if (e.target.classList.contains("checkBox")) {
        e.target.setAttribute("checked", "checked"); // Add the 'checked' attribute
        saveToLocal();
    }
})