const btns = document.querySelectorAll(".btn");
const inputBox = document.getElementById("inputBox");

function calc() {
    let previousValue = inputBox.value;
    let ans = eval(inputBox.value);
    inputBox.value = ans;
    if (ans == previousValue) {
        alert("Use operators to calculate!");
    }
}

function backspace() {
    inputBox.value = inputBox.value.slice(0, -1);
}

btns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        if (event.target.textContent == "AC") {
            inputBox.value = "";
            return;
        }
        if (event.target.textContent == "DE") {
            backspace();
            return;
        }
        if (event.target.textContent == "=") {
            if (inputBox.value.length < 1) {
                alert("Please enter value to calculate!");
                return;
            }
            calc();
            return;
        }

        inputBox.value += event.target.textContent;
    })
})