//User strict mode
"use strict";

const stopwatch = document.querySelector("#stopwatch");
const displayHours = document.querySelector("#hours");
const displayMinutes = document.querySelector("#minutes");
const displaySeconds = document.querySelector("#seconds");
const displayMilliSeconds = document.querySelector("#milliseconds");

//Buttons for the stopwatch.
const startBtn = document.querySelector("#start-btn");
const stopBtn = document.querySelector("#stop-btn");
const resetBtn = document.querySelector("#reset-btn");

let startTime;
let elapsedTime = 0;
let timerInterval;
let clickCount = 0;
const timeIntervals = [];

const startTimer = () => {
  if (clickCount === 0) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      renderTime();
    }, 10);
  } else {
    const currentTime = {
      hours: pad(parseInt(displayHours.textContent)),
      minutes: pad(parseInt(displayMinutes.textContent)),
      seconds: pad(parseInt(displaySeconds.textContent)),
      milliseconds: pad(parseInt(displayMilliSeconds.textContent), 3),
    };

    if (clickCount > 0) {
      resetTimer();
    }
    const storedTimeText = document.createElement("p");
    storedTimeText.textContent = `Round time : ${currentTime.minutes} : ${currentTime.seconds} , ${currentTime.milliseconds}`;
    watchrounds.appendChild(storedTimeText);

    timeIntervals.push(currentTime);
    startTimer();
  }

  if (clickCount >= 0) {
    startBtn.textContent = "Round";
  }
  clickCount++;
};
//

const stopTimer = () => {
  clearInterval(timerInterval);
};
const resetTimer = () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  // timeIntervals.length = 0;
  renderTime();
  clickCount = 0;
  startBtn.textContent = "Start";
};
const renderTime = () => {
  const hoursValue = Math.floor(elapsedTime / (1000 * 60 * 60));
  elapsedTime %= 1000 * 60 * 60;

  const minutesValue = Math.floor(elapsedTime / (1000 * 60));
  elapsedTime %= 1000 * 60;

  const secondsValue = Math.floor(elapsedTime / 1000);
  const millisecondsValue = elapsedTime % 1000;
  // linjen under kan ukommenteres for å telle timer.
  // displayHours.textContent = pad(hoursValue);
  displayMinutes.textContent = pad(minutesValue);
  displaySeconds.textContent = pad(secondsValue);
  displayMilliSeconds.textContent = pad(millisecondsValue, 2);
};

//Displays the entire 00:00:00 and makes sure it looks nice:
const pad = (value, length = 2) => value.toString().padStart(length, "0");

//Event Handlers
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
resetBtn.addEventListener("click", function () {
  const displayRounds = document.querySelectorAll("p");
  displayRounds.forEach((displayRound) => {
    displayRound.remove();
  });
});
