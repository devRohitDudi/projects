const quoteDiv = document.querySelector(".quoteDiv");
const quoteText = document.querySelector(".quote");
const authorText = document.querySelector(".author");
const postBTN = document.querySelector(".twitter-share-button");

const newQuote = document.getElementById("newQuote");
const tweetBTN = document.getElementById("tweet");


// quotes array of objects
const quotes = [{
    title: "“Be yourself; everyone else is already taken.”",
    author: "― Oscar Wilde"
},
{
    title: "“I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.”",
    author: "― Marilyn Monroe"
},
{
    title: "“So many books, so little time.”",
    author: "― Frank Zappa"
},
{
    title: "“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”",
    author: "― Albert Einstein"
},
{
    title: "“A room without books is like a body without a soul.”",
    author: "― Marcus Tullius Cicero"
},
{
    title: "“Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.”",
    author: "― Bernard M. Baruch"
},
{
    title: "“You've gotta dance like there's nobody watching,Love like you'll never be hurt,Sing like there's nobody listening,And live like it's heaven on earth.”",
    author: "― William W. Purkey"
},
{
    title: "“You know you're in love when you can't fall asleep because reality is finally better than your dreams.”",
    author: "― Dr. Seuss"
},
{
    title: "“You only live once, but if you do it right, once is enough.”",
    author: "― Mae West"
},
{
    title: "“Be the change that you wish to see in the world.”",
    author: "― Mahatma Gandhi"
}
];


const api_url = "https://api.quotable.io/random";

function generateQuote() {
    quoteText.innerHTML = "Loading...";
    authorText.innerHTML = "Loading...";
    // let randomIndex = Math.floor(Math.random() * 10);
    // let randomQuote = quotes[randomIndex].title;
    // let randomAuthor = quotes[randomIndex].author;
    // quoteText.innerHTML = randomQuote;
    // authorText.innerHTML = randomAuthor;

    //getting by api call
    async function getQuote(url) {
        try {
            let response = await fetch(url);
            let data = await response.json();

            quoteText.innerHTML = data.content;
            authorText.innerHTML = data.author;
        }
        catch (e) {
            quoteText.innerHTML = "TypeError: Failed to fetch";
            authorText.innerHTML = "TypeError: Failed to fetch";
        }
    }
    getQuote(api_url);
}


function tweet() {
    //%0A include next line string in url
    // and %20 include space" "
    window.open(`https://www.x.com/intent/post?text=${quoteText.innerHTML}%0A---By%20${authorText.innerHTML}`, "tweet window", "width=600, height=600");
}


newQuote.addEventListener("click", () => {
    generateQuote();
})

tweetBTN.addEventListener("click", () => {
    tweet();
})

window.onload(generateQuote());









