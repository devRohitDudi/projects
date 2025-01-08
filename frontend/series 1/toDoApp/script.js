const inputBox = document.getElementById("todo");
const addBTN = document.getElementById("addBTN");

const list = document.querySelector(".toDoList");


const itemP = document.querySelector(".itemP");
const edit = document.querySelector(".edit");
const remove = document.querySelector(".remove");

let editToDo = null;

const addToDo = () => {
    // console.log("add clicked");


    //r etrieving value
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("input can't be empty. idiot!");
        return;
    }


    // edit functionality
    if (addBTN.innerHTML === "Edit") {
        editToDo.target.parentElement.previousElementSibling.innerHTML = inputText;
        addBTN.innerHTML = "Add";
        editToDo.target.innerHTML = "Edit";

        editOnLocal(inputText);
    }

    // add funcnality
    else {
        const li = document.createElement("li");
        li.classList.add("item");

        const p = document.createElement("p");
        p.classList.add("itemP");
        p.innerHTML = inputText;
        li.appendChild(p);


        // Add action buttons
        const actionDiv = document.createElement("div");
        actionDiv.classList.add("action");

        const editButton = document.createElement("a");
        editButton.style.setProperty("--clr", "rgb(63, 163, 0)");
        editButton.classList.add("edit");
        editButton.textContent = "Edit";

        const removeButton = document.createElement("a");
        removeButton.style.setProperty("--clr", "rgb(255, 0, 0)");
        removeButton.classList.add("remove");
        removeButton.textContent = "Remove";

        actionDiv.appendChild(editButton);
        actionDiv.appendChild(removeButton);
        li.appendChild(actionDiv);

        list.appendChild(li);
        saveToLocal(inputText);
    }
    // updating
    inputBox.value = "";
}


// Add functionality to buttons
const updateToDO = (e) => {
    if (e.target.innerHTML === "Remove") {
        list.removeChild(e.target.parentElement.parentElement);
        deleteFromLocal(e.target.parentElement.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.parentElement.previousElementSibling.innerHTML;
        inputBox.focus();
        addBTN.innerHTML = "Edit";
        editToDo = e;
        e.target.innerHTML = "Editing...";
        // list.removeChild(e.target.parentElement.parentElement);
    }

    //word-wrap: break-word;
}



//save to local
const saveToLocal = (todo) => {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    tasks.push(todo);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//get from local storage
const getFromLocal = () => {
    let tasks = [];

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
        tasks.forEach(task => {
            //creating li
            const li = document.createElement("li");
            li.classList.add("item");

            const p = document.createElement("p");
            p.classList.add("itemP");
            p.innerHTML = task;
            li.appendChild(p);


            // Add action buttons
            const actionDiv = document.createElement("div");
            actionDiv.classList.add("action");

            const editButton = document.createElement("a");
            editButton.style.setProperty("--clr", "rgb(63, 163, 0)");
            editButton.classList.add("edit");
            editButton.textContent = "Edit";

            const removeButton = document.createElement("a");
            removeButton.style.setProperty("--clr", "rgb(255, 0, 0)");
            removeButton.classList.add("remove");
            removeButton.textContent = "Remove";

            actionDiv.appendChild(editButton);
            actionDiv.appendChild(removeButton);
            li.appendChild(actionDiv);

            list.appendChild(li);
        });
    }
}

// delete from local
const deleteFromLocal = (todoLi) => {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    let todoText = todoLi.children[0].innerHTML;
    let todoIndex = tasks.indexOf(todoText)

    tasks.splice(todoIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(todoIndex);
}


//edit on loacl storage
const editOnLocal = (todo) => {
    // let tasks = JSON.parse(localStorage.getItem("tasks"));
    // let todoIndex = tasks.indexOf(todo);
    // console.log(todoIndex);

    // tasks[todoIndex] = inputBox.value.trim();
    // localStorage.setItem("tasks", JSON.stringify(tasks));

    let tasks = JSON.parse(localStorage.getItem("tasks"));

    // Find the index of the task in the localStorage array
    const todoIndex = tasks.findIndex(task => task === todo);

    if (todoIndex !== -1) {
        // Update the task with the new value from inputBox
        tasks[todoIndex] = inputBox.value.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        console.error("Task not found in localStorage.");
    }

}

addBTN.addEventListener("click", addToDo);
list.addEventListener("click", updateToDO);


window.onload = getFromLocal;

