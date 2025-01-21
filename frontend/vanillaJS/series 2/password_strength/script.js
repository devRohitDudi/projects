const passwordBox = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const passwordVisibility = document.getElementById("visibility");
const passwordVisibilityOff = document.getElementById("visibilityOff");
const confirmVisibility = document.getElementById("confirmVisibility");
const confirmVisibilityOff = document.getElementById("confirmVisibilityOff");


const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");

passwordVisibilityOff.addEventListener("click", () => {
    passwordVisibilityOff.style.display = "none";
    passwordVisibility.style.display = "block";

    passwordBox.setAttribute("type", "text");
})
passwordVisibility.addEventListener("click", () => {
    passwordVisibilityOff.style.display = "block";
    passwordVisibility.style.display = "none";

    passwordBox.setAttribute("type", "password");

})


//same logic for confirm password
confirmVisibilityOff.addEventListener("click", () => {
    confirmVisibilityOff.style.display = "none";
    confirmVisibility.style.display = "block";

    confirmPassword.setAttribute("type", "text");
})
confirmVisibility.addEventListener("click", () => {
    confirmVisibilityOff.style.display = "block";
    confirmVisibility.style.display = "none";

    confirmPassword.setAttribute("type", "password");
})


// checking the strength
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
passwordBox.addEventListener("input", () => {
    console.log("Regex Match:", passwordRegex.test(password));
    if (!passwordRegex.test(passwordBox.value.trim())) {
        passwordError.innerHTML = "password is weak! minimum length is 8 including numbers, symbols, Uppercase and lowercase.";
        passwordError.style.color = "orange";
    }

    else {
        passwordError.innerHTML = "Password is strong.";
        passwordError.style.color = "lightgreen";
    }
})

confirmPassword.addEventListener("input", () => {
    if (confirmPassword.value !== passwordBox.value) {
        confirmError.innerHTML = "Enter the same password!";
        confirmError.style.color = "orange";
    }
    else {
        confirmError.innerHTML = "It's same now!";
        confirmError.style.color = "lightgreen";
    }
})
