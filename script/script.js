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
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && this.lastCall - previousCall <= t) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => f(), t);
  };
}

input.addEventListener("input", debounce(inputText, 300));
