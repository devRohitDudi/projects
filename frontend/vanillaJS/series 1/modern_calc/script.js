const clearBTN = document.getElementById("clear");
const deleteBTN = document.getElementById("delete");
const equalBTN = document.getElementById("equal");
let valueBTN = document.querySelectorAll(".value");

const inputBox = document.getElementById("input");
const addBTN = document.getElementById("plus");
const minusBTN = document.getElementById("minus");
const devideBTN = document.getElementById("devide");
const multiplyBTN = document.getElementById("multiply");


let userInput = null;

let result = '';
let operation = ''
let previousOperand = 0;


//append the input
const appendNumber = (number) => {
    if (number == "." && result.includes(".")) { return }
    result += number;
    updateDisplay();
}

// update the display
const updateDisplay = () => {
    if (operation) {
        inputBox.value = `${previousOperand}${operation}${result}`;
    }
    else {
        inputBox.value = result;
    }
}


// select the operator
const selectOperator = (operatorValue) => {
    if (result === "") return;
    if (operation !== "" && previousOperand !== "") {
        calculateResult();
    }

    operation = operatorValue;
    previousOperand = result;
    result = '';
    updateDisplay();
}

// to calculate
const calculateResult = () => {
    let evaluetedResult;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(result);

    if (isNaN(prev) || isNaN(current)) { return };

    switch (operation) {
        case "+": evaluetedResult = prev + current; break;
        case "-": evaluetedResult = prev - current; break;
        case "*": evaluetedResult = prev * current; break;
        case "/": evaluetedResult = prev / current; break;

        default: return;
    }
    result = evaluetedResult.toString();
    operation = "";
    previousOperand = 0;
}

// clear input box
const clearAll = () => {
    inputBox.value = "";
    result = "";
    operation = "";
    previousOperand = '';
}

// backspace function
const deleteLastDigit = () => {
    if (result === '') { return };
    result = result.slice(0, -1)
    updateDisplay(); // after apply this not updating after entering operation after a operation
}



// select operators
addBTN.addEventListener("click", () => selectOperator("+"));
minusBTN.addEventListener("click", () => selectOperator("-"));
devideBTN.addEventListener("click", () => selectOperator("/"));
multiplyBTN.addEventListener("click", () => selectOperator("*"));




//event listener for each button
valueBTN.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        appendNumber(e.target.innerHTML);
    });
})

// calcuate functionality
equalBTN.addEventListener("click", () => {
    if (result === "") { return };
    calculateResult();
    updateDisplay();
})

//clear all 
clearBTN.addEventListener("click", clearAll)

//deleteBTN
deleteBTN.addEventListener("click", deleteLastDigit)