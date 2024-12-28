let slider = document.getElementById("slider");
let sliderValue = document.getElementById("value");
let uppercase = document.getElementById("uppercase");
let lowrcase = document.getElementById("lowercase");
let numeric = document.getElementById("numeric");
let symbol = document.getElementById("symbol");
let copybtn = document.getElementById("copyIcon");

let passBox = document.querySelector(".passBox");
let generate = document.querySelector(".generate");

//input slider value
sliderValue.textContent = slider.value;
slider.addEventListener("input", () => {
    sliderValue.textContent = slider.value;
})

// listening click event 
generate.addEventListener("click", () => {
    passBox.value = generatePass();
})


const upperChars = "ABCDEFGHIJKLLMNOPQRSTUVWXYZ"
const lowerChars = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789"
const symbols = "~`!@#$%^&*()_+=-[]{}\|:;,.<>?/"

// generate pass function
function generatePass() {
    let password = "";

    let allChars = "";
    allChars += lowrcase.checked ? lowerChars : "";
    allChars += uppercase.checked ? upperChars : "";
    allChars += numeric.checked ? numbers : "";
    allChars += symbol.checked ? symbols : "";

    let count = slider.value
    while (count > 0) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        count--;
    }
    return password;
}

copybtn.addEventListener("click", () => {
    if (passBox.value != "" || passBox.value.length >= 1) {
        navigator.clipboard.writeText(passBox.value);
        copybtn.innerHTML = "check", "done_all";
        copybtn.title = "Password copied";

        setTimeout(() => {
            copybtn.innerHTML = "content_copy";
            copybtn.title = "";
        }, 2000);
    }
});