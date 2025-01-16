const inputBox = document.getElementById("inputBox");
const generateBTN = document.getElementById("generateBTN");
const copyBTN = document.getElementById("copy");


const passLength = 12;
let generatedPassword = '';

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvqxyz";
const symbols = `~!@#$%^&*()_+-={}|:"<?,./;'[\]`;
const numbers = "1234567890";
const allChars = uppercase + lowercase + numbers + symbols;




const generatePassword = () => {
    inputBox.innerHTML = "";
    generatedPassword = "";
    generatedPassword += uppercase[Math.floor(Math.random() * uppercase.length)];
    generatedPassword += lowercase[Math.floor(Math.random() * lowercase.length)];
    generatedPassword += symbols[Math.floor(Math.random() * symbols.length)];
    generatedPassword += numbers[Math.floor(Math.random() * numbers.length)];

    while (generatedPassword.length < passLength) {
        generatedPassword += allChars[Math.floor(Math.random() * allChars.length)];
    }
    inputBox.value = generatedPassword;
}

const copyPassword = () => {
    inputBox.select();
    document.execCommand("copy");

}


generateBTN.addEventListener("click", () => {
    generatePassword();
})
copyBTN.addEventListener("click", () => {
    copyPassword();
})