const inputBox = document.querySelectorAll(".inputBox");
const createBTN = document.getElementById("createBTN");
const deleteBTN = document.querySelectorAll(".deleteIcon");
const notes_container = document.querySelector(".notes_container");
const doneIconStyle = document.querySelector(".doneIcon");

const doneIcon = `<svg class="doneIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">  <path   d="m381-240 424-424-57-56-368 367-169-170-57 57 227 226Zm0 113L42-466l169-170 170 170 366-367 172 168-538 538Z" /></svg>`;
const deleteIcon = `<svg class="deleteIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" /> </svg>`;


// getting local storage notes
function showNotes() {
    notes_container.innerHTML = localStorage.getItem("notes");
}
showNotes();


//creating note
function createNote() {
    const noteDiv = document.createElement("div");
    noteDiv.className = "noteDiv";

    const note = document.createElement("p");
    note.className = "inputBox";
    note.setAttribute("contenteditable", "true");

    noteDiv.appendChild(note);
    // noteDiv.innerHTML += doneIcon;
    noteDiv.innerHTML += deleteIcon;
    notes_container.appendChild(noteDiv);
    updateOnLocal();
}


function updateOnLocal() {
    localStorage.setItem("notes", notes_container.innerHTML);
}






createBTN.addEventListener("click", () => {
    createNote();
})


notes_container.addEventListener("click", (e) => {
    if (e.target.tagName === "svg") {
        e.target.parentElement.remove();
        updateOnLocal();
    }
    // else if (e.target.tagName === "p") {
    //     inputBox = document.querySelectorAll(".inputBox");
    //     inputBox.forEach(nt => {
    //         nt.onkeyup = function () {
    //             updateOnLocal();
    //         }
    //     });
    // }
})

document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        document.execCommand("insertLineBreak");
        e.preventDefault();
    }
    updateOnLocal();
})
