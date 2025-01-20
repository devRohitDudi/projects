const emailError = document.getElementById("emailError");
const scriptURL = 'https://script.google.com/macros/s/AKfycbxxsxQWmdP-l5TAVuOOrCY_IIWGvRsFNjREJMBGPa7h00JFwiDYoewWjV0V2KTPYPv9/exec'
const form = document.forms['submit-to-google-sheet']
const emailBox = document.getElementById("emailBox");


form.addEventListener('submit', e => {
    e.preventDefault()
    // let's apply a trick to disable input box untill the fetch is working
    emailBox.disabled = true;
    emailError.innerHTML = "Working...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => printSuccess(response))
        .catch(error => printFail(error))

})


// now just printing
function printSuccess(response) {
    console.log('Success!', response);
    emailError.innerHTML = "Thank you for subscribing!";
    emailError.style.color = "lightgreen";
    emailBox.disabled = false;
    emailBox.value = "";

    setTimeout(() => {
        emailError.innerHTML = "";
    }, 6000)
}
function printFail(error) {
    console.error('Error!', error.message)
    emailError.innerHTML = "Failed to submit. try again!";
    emailError.style.color = "red";
    emailBox.disabled = false;

    setTimeout(() => {
        emailError.innerHTML = "";
    }, 6000)
}

