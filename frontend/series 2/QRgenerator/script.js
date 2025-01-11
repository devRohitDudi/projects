const generate = document.querySelector(".generate");
const imageBox = document.querySelector(".imageDiv");
const inputBox = document.querySelector(".inputBox");



function generateQR() {
    console.log("Clicked");
    inputBox.value = "";
    new QRCode(imageBox, {
        text: inputBox.value,
        height: 200,
        width: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,

    })
    imageBox.style.display = "block";


    // new QRCode(qrBox, {
    //     text: inputText.value,
    //     width: size,
    //     height: size,
    //     colorDark: "#000000",
    //     colorLight: "#ffffff",
    //     // correctLevel: QRCode.CorrectLevel.H,
    // })
}

generate.addEventListener("click", () => {
    if (inputBox.value.length > 0) {
        generateQR();
    }
    else {
        alert("Enter the Text first!");
    }
})