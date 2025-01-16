const inputBox = document.querySelector(".inputBox");
const calcBTN = document.querySelector(".calcBTN");
const result = document.querySelector(".result");
const dobText = document.querySelector(".dobText");


const yearsText = document.getElementById("years");
const monthsText = document.getElementById("months");
const daysText = document.getElementById("days");


// disbale future dates in date type input
inputBox.max = new Date().toISOString().split("T")[0];


function calculateAge() {
    let birthDate = new Date(inputBox.value);
    const today = new Date();

    let inputYear = birthDate.getFullYear();
    let inputMonth = birthDate.getMonth() + 1;
    let inputDay = birthDate.getDate();

    let currentDate = today.getDate();
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();

    let dd, mm, yy;
    yy = currentYear - inputYear;
    mm = currentMonth - inputMonth;
    dd = currentDate - inputDay;


    // Adjust for negative days
    if (dd < 0) {
        mm--; // Borrow a month
        // Get the days in the previous month
        const previousMonth = currentMonth - 1 || 12; // Handle January (month 1)
        const previousYear = previousMonth === 12 ? currentYear - 1 : currentYear; // Adjust year for December
        dd += getDaysInMonth(previousYear, previousMonth);
    }

    // Adjust for negative months
    if (mm < 0) {
        yy--; // Borrow a year
        mm += 12; // Add 12 months to make it positive
    }

    yearsText.innerHTML = yy;
    monthsText.innerHTML = mm;
    daysText.innerHTML = dd;

    result.style.display = "block";
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}


calcBTN.addEventListener("click", () => {
    if (inputBox.value !== "") {
        calculateAge();
    }
    else {
        alert("Select the date first!");
    }
})

// same function for enter button
document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        calculateAge();
    }
})