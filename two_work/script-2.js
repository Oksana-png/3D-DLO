"Use srtict";
const message = document.querySelector(".clock");

function getDate(deadline) {
  const date = new Date();

  const dateD = date.getTime(),
    dateStop = new Date(deadline).getTime(),
    timeRemaining = (dateStop - dateD) / 1000,
    seconds = date.getSeconds(),
    minutes = date.getMinutes(),
    hours = date.getHours(),
    timeDays = timesDay(),
    week = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ],
    hepNewEar = Math.floor(timeRemaining / 60 / 60 / 24);

  let day;
  week.forEach((item, i) => {
    if (date.getDay() === i) {
      day = item;
    }
  });

  function createZero(elem) {
    if (elem < 10) {
      elem = `0${elem}`;
      return elem;
    }
    return elem;
  }

  function timesDay() {
    if (hours >= 5 && hours < 13) {
      return "Доброе утро";
    } else if (hours >= 13 && hours <= 18) {
      return "Добрый день";
    } else if (hours > 18 && hours <= 22) {
      return "Добрый вечер";
    } else if (hours > 22 || (hours >= 0 && hours < 5)) {
      return "Доброй ночи";
    }
  }

  message.innerHTML = `${timeDays}<br>
    Сегодня: ${day}<br>
    Текущее время: ${createZero(hours)}:${createZero(minutes)}:${createZero(
    seconds
  )}<br>
    До нового года осталось ${hepNewEar}<br>`;
}

setInterval(getDate, 1000, "1 January 2022");
