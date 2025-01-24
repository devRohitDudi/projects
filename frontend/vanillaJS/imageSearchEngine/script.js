const inputBox = document.getElementById("input");
const searchBTN = document.getElementById("search");
const resultDiv = document.getElementById("result");
const showMore = document.getElementById("showmore");


const apiKey = "X1FqKcRSr-BNSTR89EgoQ1fR865IlSEOFpAdFMTdY5Y";
const url = "https://api.unsplash.com/search/photos";

let page = 1;

const getImages = async () => {
    const query = inputBox.value;
    const requestURL = `${url}?page=${page}&query=${query}&client_id=${apiKey}&per_page=12`

    let response = await fetch(requestURL);
    let data = await response.json();

    const results = data.results;
    console.log(data);

    // inserting images in html
    results.map((result) => {

        let image = document.createElement("img");
        image.classList.add("image");
        image.src = result.urls.small;

        let imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank"

        // for download button
        // let downloadBTN = document.createElement("a");
        // downloadBTN.innerHTML = "Download"
        // downloadBTN.href = result.links.download;
        // downloadBTN.classList.add("download");

        imageLink.appendChild(image);
        // imageLink.appendChild(downloadBTN);

        resultDiv.appendChild(imageLink);
    });
    showMore.style.display = "block"
};

searchBTN.addEventListener("click", () => {
    if (inputBox.value === "") {
        alert("Please enter anything to search.");
        return;
    }

    resultDiv.innerHTML = "";
    page = 1;
    getImages();

});

//same logic for enter button
window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (inputBox.value === "") {
            alert("Please enter anything to search.");
            return;
        }
        resultDiv.innerHTML = "";
        page = 1;
        getImages();
    }
})

// showing more 
showMore.addEventListener("click", () => {
    page++;
    getImages();
})