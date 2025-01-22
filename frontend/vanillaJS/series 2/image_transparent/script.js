const imgBox = document.querySelector(".imgDiv");
const imgWrap = document.querySelector(".imgWrap");
const originalIMG = document.getElementById("originalIMG");
const line = document.getElementById("line");

originalIMG.style.width = imgBox.offsetWidth + "px";

let leftSpace = imgBox.offsetLeft;

imgBox.onmousemove = function (e) {
    let boxWidth = (e.pageX - leftSpace) + "px";
    imgWrap.style.width = boxWidth;
    line.style.left = boxWidth;
}