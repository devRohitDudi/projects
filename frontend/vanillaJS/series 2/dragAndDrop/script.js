const itemDiv = document.getElementsByClassName("item");
const rightBox = document.getElementById("right");
const leftBox = document.getElementById("left");



for (list of itemDiv) {
    list.addEventListener("dragstart", (e) => {
        let selected = e.target;

        rightBox.addEventListener("dragover", (e) => {
            e.preventDefault();
        })
        rightBox.addEventListener("drop", (e) => {
            rightBox.appendChild(selected);
            selected = null;
        })

        //same logic for leftBox
        leftBox.addEventListener("dragover", (e) => {
            e.preventDefault();
        })
        leftBox.addEventListener("drop", (e) => {
            leftBox.appendChild(selected);
            selected = null;
        })
    })
}