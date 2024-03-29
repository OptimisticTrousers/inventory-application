const categoryButtons = document.querySelectorAll(".list__button");
const newArrivals = document.querySelectorAll(".window .item");

// handle category button clicked
function switchCategory(e) {
  const categorySelected = e.target.innerText.toLowerCase();
  for (const item of newArrivals) {
    if (categorySelected === "all" || item.id.includes(categorySelected)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  }
  for (const categoryButton of categoryButtons) {
    categoryButton.classList.remove("list__button--selected");
  }
  e.target.classList.add("list__button--selected");
}

// add event listeners to category buttons
for (const categoryButton of categoryButtons) {
  categoryButton.addEventListener("click", switchCategory);
}

let durationObj;

// duration in seconds
function setDurationObj(duration) {
  const seconds = duration % 60;
  const minutes = Math.floor((duration / 60) % 60);
  const hours = Math.floor((duration / 60 / 60) % 24);
  const days = Math.floor((duration / 60 / 60 / 24) % 7);
  durationObj = { days, hours, minutes, seconds, totalDuration: duration };
}

function setInitialDurationObj() {
  const now = new Date();
  const sunday = new Date();
  sunday.setDate(now.getDate() - now.getDay() + 7); // Make Sunday
  sunday.setHours(11); // Set 11am
  sunday.setMinutes(0);
  sunday.setSeconds(0);

  // duration in seconds
  const duration = Math.round(sunday - now) / 1000;
  setDurationObj(duration);
}

function tickTimer() {
  const duration =
    durationObj.totalDuration > 0 ? durationObj.totalDuration - 1 : 0;
  setDurationObj(duration);
}

function setTimerElem() {
  const daysElem = document.querySelector(".deal-of-the-week__count--day");
  const hoursElem = document.querySelector(".deal-of-the-week__count--hour");
  const minutesElem = document.querySelector(".deal-of-the-week__count--min");
  const secondsElem = document.querySelector(".deal-of-the-week__count--sec");

  daysElem.innerText = durationObj.days.toFixed(0);
  hoursElem.innerText = durationObj.hours.toFixed(0);
  minutesElem.innerText = durationObj.minutes.toFixed(0);
  secondsElem.innerText = durationObj.seconds.toFixed(0);
}

function startTimer() {
  setInterval(() => {
    tickTimer();
    setTimerElem();
  }, 1000);
}

setInitialDurationObj();
setTimerElem();
startTimer();
