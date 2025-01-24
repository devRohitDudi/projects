const ethereum = document.getElementById("ethereum");
const dogecoin = document.getElementById("dogecoin");
const bitcoin = document.getElementById("bitcoin");



// without apikey
const url = "https://api.coingecko.com/api/v3/simple/price";
const params = new URLSearchParams({
    ids: "bitcoin,dogecoin,ethereum",
    vs_currencies: "usd"
    //     api_key: "CG-bc2L6LjGDzyAqZKYcG71fdDn" // Pass API key as a query parameter
});

// Fetching data
fetch(`${url}?${params}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Bitcoin Price (USD):", data.bitcoin.usd);
        console.log("Ethereum Price (USD):", data.ethereum.usd);
        console.log("Dogecoin Price (USD):", data.dogecoin.usd);

        ethereum.textContent = data.ethereum.usd
        bitcoin.textContent = data.bitcoin.usd
        dogecoin.textContent = data.dogecoin.usd
    })
    .catch(error => {
        console.error("Error:", error);
    });

// this is just generating this request url
// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,dogecoin,ethereum&vs_currencies=usd

