const submitButton = document.getElementById("submit");
const fullName = document.getElementById("fullName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");

let nameRegex = /^[A-Za-z]+(\s[A-Za-z]+)+$/;
let phoneRegex = /^\+?(\d{1,3})?[-. ]?(\d{3})[-. ]?(\d{3})[-. ]?(\d{4})$/;
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



function validateName() {
    if (fullName.value.length < 1) {
        nameError.innerHTML = "Name is required.";
        return;
    }
    if (!nameRegex.test(fullName.value.trim())) {
        nameError.innerHTML = "You must write your full name.";
        return;
    }
    else {
        nameError.innerHTML = "";
        return true;
    }
}

function validatePhone() {
    if (phone.value.length < 1) {
        phoneError.innerHTML = "Phone number is required.";
        return;
    }
    if (!phoneRegex.test(phone.value.trim())) {
        phoneError.innerHTML = "You must enter valid phone number.";
        return;
    }
    else {
        phoneError.innerHTML = "";
        return true;
    }
}

function validateEmail() {
    if (email.value.length < 1) {
        emailError.innerHTML = "Email is required.";
        return;
    }
    if (!emailRegex.test(email.value.trim())) {
        emailError.innerHTML = "Enter a valid email address.";
        return;
    }
    else {
        emailError.innerHTML = "";
        return true;
    }
}

fullName.addEventListener("input", validateName);
phone.addEventListener("input", validatePhone);
email.addEventListener("input", validateEmail);


submitButton.addEventListener("click", (e) => {
    if (validateEmail() &&
        validatePhone() &&
        validateName()) {
        alert("Form Submitted successfully!");
        fullName.value = "";
        email.value = "";
        phone.value = "";
    }

    if (nameError.innerHTML || phoneError.innerHTML || emailError.innerHTML) {
        e.preventDefault();
    }
})