const questions = [
    {
        question: "what is return file name for webserver?",
        options: [
            { text: "index.html", correct: true },
            { text: "style.html", correct: false },
            { text: "style.css", correct: false },
            { text: "script.html", correct: false },
        ]
    },
    {
        question: "what is the API key?",
        options: [
            { text: "A web app", correct: false },
            { text: "key to access data from server", correct: true },
            { text: "a key to access data from stations", correct: false },
            { text: "data security key", correct: false },
        ]
    },
    {
        question: "what are the designated initialisers in swift?",
        options: [
            { text: "initializer that initializes a class properties", correct: false },
            { text: "initializer that fully initializes all properties", correct: true },
            { text: "initializer that initializes runtime variables", correct: false },
            { text: "initializer that initializes secure data. ", correct: false },
        ]
    },
    {
        question: "What is the browsing error standard?",
        options: [
            { text: "Web server response", correct: false },
            { text: "messages from a web server that indicate something has gone wrong when a browser requests a service", correct: true },
            { text: "eror in a tab ", correct: false },
            { text: "browsing data error ", correct: false },
        ]
    },
];


const questionElement = document.getElementById("question");
const selection = document.getElementById("btns");
const nextBTN = document.querySelector(".nextBTN");


let curretnQuestionIndex = 0;
let score = 0;

function startQuiz() {
    curretnQuestionIndex = 0;
    score = 0;
    nextBTN.innerHTML = "Next";
    nextBTN.style.display = "block";
    showQuestion();
}

function showQuestion() {
    resetPrev();
    let curretnQuestion = questions[curretnQuestionIndex];
    let questionNo = curretnQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + curretnQuestion.question;

    curretnQuestion.options.forEach(ans => {
        const button = document.createElement("button");
        button.className = "option";
        button.innerHTML = ans.text;
        selection.appendChild(button);

        if (ans.correct) {
            button.dataset.correct = ans.correct;
        }
        selection.addEventListener("click", selectAnswer)

    })

}

function resetPrev() {
    nextBTN.style.display = "none";
    while (selection.firstChild) {
        selection.removeChild(selection.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBTN = e.target;
    const isCorrect = selectedBTN.dataset.correct === "true";

    if (isCorrect) {
        selectedBTN.classList.add("correct");
        score++;
    }
    else {
        selectedBTN.classList.add("inCorrect")
    }

    Array.from(selection.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBTN.style.display = "block";
}


function showScore() {
    resetPrev();
    questionElement.innerHTML = `You scores ${score} out of ${questions.length}!`;
    nextBTN.innerHTML = "Play again";
    nextBTN.style.display = "block";
}

function nextButtonWork() {
    curretnQuestionIndex++;
    if (curretnQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextBTN.addEventListener("click", () => {
    if (curretnQuestionIndex < questions.length) {
        nextButtonWork();
    }
    else {
        startQuiz();
    }
})

startQuiz();
