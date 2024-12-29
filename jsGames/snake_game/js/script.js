let inputDir = { x: 0, y: 0 };
// const musicSound = new Audio("../assets/music.mp3")
// const moveSound = new Audio("../assets/move.mp3")
// const foodSound = new Audio("../assets/food.mp3")
// const gameOverSound = new Audio("../assets/gameover.mp3")

const musicSound = new Audio("http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3")
const foodSound = new Audio("http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/eatedible.ogg")
const moveSound = new Audio("https://rpg.hamsterrepublic.com/wiki-images/2/21/Collision8-Bit.ogg")
const gameoverSound = new Audio("http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/explosion_02.wav")


let speed = 9;
let score = 0;
let highScoreVal = 0
let highScoreDiv = document.querySelector("#highScoreDiv")
let lastPaintTime = 0;
let snakeArr = [{ x: 18, y: 18 }];
let board = document.querySelector(".board")

food = { x: 5, y: 6 };


//game functions
function main(CurrTime) {
    // console.log(CurrTime);

    window.requestAnimationFrame(main);
    if ((CurrTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = CurrTime;
    gameEngine();
};


function isCollide(snake) {
    //if collide in yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if collide in wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    // else { return false; }
}


function gameEngine() {
    //updating the snake arr and food
    if (isCollide(snakeArr)) {
        gameoverSound.play()
        musicSound.pause()
        inputDir = { x: 0, y: 0 };
        alert("game over Lazy player. pess any key to play again!")
        snakeArr = [{ x: 13, y: 15 }];
        // musicSound.play()
        score = 0;
    }

    // if eaten the food, then increment the snake and regenerate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play()
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

        score++;
        scoreCount.innerHTML = "Score: " + score;
        if (score > highScoreVal) {
            highScoreVal = score;
            localStorage.setItem("hiscore", JSON.stringify(highScoreVal));
            highScoreDiv.innerHTML = "High Score: " + highScoreVal;
        }
    }


    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //display the snake head
    board.innerHTML = "";
    snakeArr.forEach((ele, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = ele.y;
        snakeElement.style.gridColumnStart = ele.x;
        if (index === 0) {
            snakeElement.classList.add("head")
        }
        else {
            snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement);
    })


    //display the food

    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement);
}

// high score logic
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    highScoreVal = 0;
    localStorage.setItem("hiscore", JSON.stringify(highScoreVal));
}
else {
    highScoreVal = JSON.parse(hiscore);
    highScoreDiv.innerHTML = "High Score: " + highScoreVal;
}



// main logic
window.requestAnimationFrame(main)
window.addEventListener("keydown", e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    musicSound.play();
    switch (e.key) {

        case "ArrowUp": console.log("arrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown": console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;

            break;

        case "ArrowLeft": console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight": console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default: break;
    }
})

