const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var scoreOneElement = document.getElementById("score-one");
var scoreTwoElement = document.getElementById("score-two");
var scoreThreeElement = document.getElementById("score-three");
var totalScoreElement = document.getElementById("total-score");
var resetElement = document.getElementById("reset");

var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;

var round = 1;
var point = 0;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }
}

// Score:
function score() {
    if (timer[0] < 1 && round === 1) {
        scoreOneElement.innerHTML = 1;
        point++;
    } else if (timer[0] < 1 && round === 2) {
        scoreTwoElement.innerHTML = 1;
        point++;
    } else if (timer[0] < 1 && round === 3) {
        scoreThreeElement.innerHTML = 1;
        point++;
    }
}

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
}

// Reset points:
function resetPoints(valueOfRound) {
    if (valueOfRound > 4) {
        valueOfRound = 1;

        scoreOneElement.innerHTML = 0;
        scoreTwoElement.innerHTML = 0;
        scoreThreeElement.innerHTML = 0;
        totalScoreElement.innerHTML = "---";

        round = 1;
        resetElement.innerHTML = "Start over";
    }
}

// Play again:
function playAgain(valueOfRound) {
    if (valueOfRound === 4) {

        if (point > 1) {
            totalScoreElement.innerHTML = "You won!";
        } else {
            totalScoreElement.innerHTML = "You lost!";
        }

        point = 0;
        resetElement.innerHTML = "Play again";
    }
}

// Reset everything:
function reset() {
    if (testArea.value.length > 0 || round > 3) {
        clearInterval(interval);
        interval = null;

        timerRunning = false;

        score();

        timer = [0, 0, 0, 0];

        round++;

        resetPoints(round);

        playAgain(round);

        testArea.value = "";
        theTimer.innerHTML = "00:00:00";
        testWrapper.style.borderColor = "grey";
    }
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
