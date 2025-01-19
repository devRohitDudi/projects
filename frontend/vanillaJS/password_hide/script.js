const passwordBox = document.getElementById("password");
const confirmPasswordBox = document.getElementById("confirmPassword");

const passwordVisibility = document.getElementById("passwordVisibility");
const passwordVisibilityOff = document.getElementById("passwordVisibilityOff");

const confirmVisibility = document.getElementById("confirmVisibility");
const confirmVisibilityOff = document.getElementById("confirmVisibilityOff");


passwordVisibilityOff.addEventListener("click", () => {
    passwordBox.setAttribute("type", "text");

    //changing the icon
    passwordVisibilityOff.style.display = "none";
    passwordVisibility.style.display = "block";
})

passwordVisibility.addEventListener("click", () => {
    passwordBox.setAttribute("type", "password");

    //changing the icon
    passwordVisibilityOff.style.display = "block";
    passwordVisibility.style.display = "none";
})



//same logic for confirm password as well
confirmVisibilityOff.addEventListener("click", () => {
    confirmPasswordBox.setAttribute("type", "text");

    //changing the icon
    confirmVisibilityOff.style.display = "none";
    confirmVisibility.style.display = "block";
})
confirmVisibility.addEventListener("click", () => {
    confirmPasswordBox.setAttribute("type", "password");

    //changing the icon
    confirmVisibilityOff.style.display = "block";
    confirmVisibility.style.display = "none";
})