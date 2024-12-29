let inputText = document.querySelector(".inputBox");
let sizes = document.querySelector("#selector");
let generateBtn = document.querySelector("#generate");
let downloadBtn = document.querySelector("#download");
let qrBox = document.querySelector(".qrCode");


generateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (inputText.value.length > 0) {
        qrBox.innerHTML = "";
        generateQR()
    } else {
        alert("Please enter URL or Text");

    }
});

downloadBtn.addEventListener("click", () => {
    console.log("download clicked");

    let img = document.querySelector(".qrCode img");

    // if (img !== null) {
    //     let imgAtrr = img.getAttribute("src");
    //     downloadBtn.setAttribute("href", imgAtrr)
    // }
    // else {
    //     downloadBtn.setAttribute("href", `${document.querySelector('canvas').toDataURL()}`)
    // }



    let canvas = document.querySelector(".qrCode canvas");

    if (img) {
        let imgSrc = img.getAttribute("src");
        triggerDownload(imgSrc, "QR_Code.png");
    } else if (canvas) {
        let canvasURL = canvas.toDataURL("image/png");
        triggerDownload(canvasURL, "QR_Code.png");
    } else {
        alert("No QR code to download. Please generate one first.");
    }

})


function generateQR() {
    let size = parseInt(sizes.value);

    new QRCode(qrBox, {
        text: inputText.value,
        width: size,
        height: size,
        colorDark: "#000000",
        colorLight: "#ffffff",
        // correctLevel: QRCode.CorrectLevel.H,
    })
}




function triggerDownload(url, filename) {
    let link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}