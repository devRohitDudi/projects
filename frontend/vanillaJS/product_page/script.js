currentImage = document.getElementById("currentImage");
btns = document.getElementsByClassName("btn");

btns[0].onclick = () => {
    currentImage.src = "./image1.jpg"

    for (btn of btns) {
        btn.classList.remove("active");
    }
    btns[0].classList.add("active");
}

btns[1].onclick = () => {
    currentImage.src = "./image2.jpg"

    for (btn of btns) {
        btn.classList.remove("active");
    }
    btns[1].classList.add("active");
}

btns[2].onclick = () => {
    currentImage.src = "./image3.jpg"

    for (btn of btns) {
        btn.classList.remove("active");
    }
    btns[2].classList.add("active");
}

