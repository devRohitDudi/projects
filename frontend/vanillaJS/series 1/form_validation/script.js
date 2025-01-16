const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const createBTN = document.getElementById("create");



const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");


createBTN.addEventListener("click", () => {

    if (fullNameCheck() === true) {
        nameError.innerHTML = "";
        nameError.previousElementSibling.classList.add("fa-check");
    }
    if (emailCheck() === true) {
        emailError.innerHTML = "";
        emailError.previousElementSibling.classList.add("fa-check");
    }
    if (passwodCheck() === true) {
        passwordError.innerHTML = "";
        passwordError.previousElementSibling.classList.add("fa-check");
    }
    if (confirmPasswodCheck() === true) {
        confirmPasswordError.innerHTML = "";
        confirmPasswordError.previousElementSibling.classList.add("fa-check");
    }
    else {
        // alert("please enter valid details");
    }
    showAlert();

})

function fullNameCheck() {
    if (fullName.value.length == 0) {
        nameError.innerHTML = "Full name is required";
        nameError.previousElementSibling.classList.add("fa-xmark");
        return false;
    }
    if (!fullName.value.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameError.innerHTML = "Write Full name. in correct format Ex: 'Alex rober'";
        nameError.previousElementSibling.classList.add("fa-xmark");
        return false
    }

    return true;
}
function emailCheck() {
    if (email.value.length == 0) {
        emailError.innerHTML = "email is required";
        emailError.previousElementSibling.classList.add("fa-xmark");
        return false;
    }
    if (!email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        emailError.innerHTML = "Enter valid email";
        emailError.previousElementSibling.classList.add("fa-xmark");
        return false
    }
    return true;
}

function passwodCheck() {
    if (password.value.length < 8) {
        passwordError.innerHTML = "password is required with at least 8 chaacters";
        passwordError.previousElementSibling.classList.add("fa-xmark");
        return false;
    }
    if (!password.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{8,30}$/)) {
        passwordError.innerHTML = "At Least 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character, no whitespace and length between 8-30";
        passwordError.previousElementSibling.classList.add("fa-xmark");
        return false
    }
    return true;
}
function confirmPasswodCheck() {
    if (confirmPassword.value != password.value) {
        confirmPasswordError.innerHTML = "Please enter same password";
        confirmPasswordError.previousElementSibling.classList.add("fa-xmark");
        return false;
    }
    return true;
}

function showAlert() {
    if (fullNameCheck() && emailCheck() && passwodCheck() && confirmPasswodCheck()) {
        alert("Nice! form is submitted.");
        fullName.value = "";
        email.value = "";
        password.value = "";
        confirmPassword.value = "";
    }

}
