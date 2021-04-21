// window.addEventListener("DOMContentLoaded", () => {
//   // таймер
//   function countTimer(deadline) {
//     const timerHours = document.querySelector("#timer-hours"),
//       timerMinutes = document.querySelector("#timer-minutes"),
//       timerSeconds = document.querySelector("#timer-seconds");

//     function getTimeRemaning() {
//       const dateStop = new Date(deadline).getTime(),
//         dateNow = new Date().getTime(),
//         timeRemaining = (dateStop - dateNow) / 1000,
//         seconds = Math.floor(timeRemaining % 60),
//         minutes = Math.floor((timeRemaining / 60) % 60),
//         hours = Math.floor((timeRemaining / 60 / 60) % 24);
//       // day = Math.floor(timeRemaining / 60 / 60 / 24);  дни
//       return { timeRemaining, hours, minutes, seconds };
//     }
//     //создание нуля, если число меньше 10
//     function createZero(elem) {
//       if (elem < 10) {
//         elem = `0${elem}`;
//         return elem;
//       }
//       return elem;
//     }

//     function updateClock() {
//       let timer = getTimeRemaning();
//       timerHours.textContent = createZero(timer.hours);
//       timerMinutes.textContent = createZero(timer.minutes);
//       timerSeconds.textContent = createZero(timer.seconds);
//       if (timer.timeRemaining < 0) {
//         timerHours.textContent = "00";
//         timerMinutes.textContent = "00";
//         timerSeconds.textContent = "00";
//         return;
//       }
//       setTimeout(() => {
//         updateClock();
//       }, 1000);
//     }

//     updateClock();
//   }

//   countTimer("22 april 2021");
// });

const input = document.querySelector(".input");
const text = document.querySelector(".text");

function inputText() {
  console.log(text);
  text.textContent = input.value;
}
// дебаунсинг, есть еще троттлинг
function debounce(f, t) {
  return function () {
    const previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && this.lastCall - previousCall <= t) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => f(), t);
  };
}

input.addEventListener("input", debounce(inputText, 300));
// ВТОРОЕ ЗАДАНИЕ, АНИМАЦИя
const buttonStart = document.querySelector(".button");
const buttonReset = document.querySelector(".button-reset");
const airplane = document.querySelector(".svg-air");
const jumping = document.querySelector(".svg");

let animate = false;

buttonStart.addEventListener("click", () => {
  if (!animate) {
    flyInterval = requestAnimationFrame(flyAnimate);
    animate = true;
  } else {
    animate = false;
    cancelAnimationFrame(flyInterval);
  }
});

let flyInterval,
  count = 0;
console.log();
function flyAnimate() {
  flyInterval = requestAnimationFrame(flyAnimate);
  count++;
  if (count < 90) {
    airplane.style.left = count + "px";
    jumping.style.top = count + "px";
    airplane.style.transform = `rotate(${count / 2}deg)`;
    jumping.style.transform = `rotate(${count}deg)`;
  } else if (count < 380) {
    airplane.style.left = count + "px";
    jumping.style.top = count + "px";
    jumping.style.transform = `rotate(${count}deg)`;
  } else if (count < window.screen.availWidth - 150) {
    airplane.style.left = count + "px";
  } else {
    cancelAnimationFrame(flyInterval);
  }
}

buttonReset.addEventListener("click", () => {
  airplane.style.left = "0px";
  jumping.style.top = "0px";
  airplane.style.transform = `rotate(0deg)`;
  jumping.style.transform = `rotate(0deg)`;
  count = 0;
});
