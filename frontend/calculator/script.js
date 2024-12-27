let outputbox = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

let string = "";

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            try {
                string = eval(string);
                outputbox.value = string;
            }
            catch (error) {
                outputbox.value = "error";
                string = "";
            }
        }
        else if (e.target.innerHTML == 'AC') {
            string = "";
            outputbox.value = string;
        }
        else if (e.target.innerHTML == "DEL") {
            string = string.substring(0, string.length - 1);
            outputbox.value = string
        }
        else {
            string += e.target.innerHTML;
            outputbox.value = string;
        }
    })
})