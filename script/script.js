window.addEventListener("DOMContentLoaded", () => {
  // таймер
  function countTimer(deadline) {
    const timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaning() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor((timeRemaining / 60 / 60) % 24);
      // day = Math.floor(timeRemaining / 60 / 60 / 24);  дни
      return { timeRemaining, hours, minutes, seconds };
    }
    //создание нуля, если число меньше 10
    function createZero(elem) {
      if (elem < 10) {
        elem = `0${elem}`;
        return elem;
      }
      return elem;
    }

    function updateClock() {
      const timer = getTimeRemaning();
      timerHours.textContent = createZero(timer.hours);
      timerMinutes.textContent = createZero(timer.minutes);
      timerSeconds.textContent = createZero(timer.seconds);
      if (timer.timeRemaining < 0) {
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
        return;
      }
      setTimeout(() => {
        updateClock();
      }, 1000);
    }

    updateClock();
  }
  countTimer("29 april 2021");

  // открытие и закрытию меню
  const btnMenu = document.querySelector(".menu"),
    closeMenu = document.querySelector(".close-btn"),
    menu = document.querySelector("menu"),
    itemMenu = menu.querySelectorAll("ul>li");

  const handlerMenu = () => {
    if (document.documentElement.clientWidth <= 768) {
      menu.style.transform = `translate(50%)`;
      return;
    }
    // menu.classList.toggle("active-menu");
    // анимация появления
    const animationMenu = requestAnimationFrame(anim);

    function anim() {
      let count = -100;
      const timerMenu = setInterval(() => {
        if (count < 100) {
          count += 2;
          menu.style.transform = `translate(${count}%)`;
        } else {
          clearInterval(timerMenu);
          cancelAnimationFrame(animationMenu);
        }
      }, 10);
    }
  };
  const close = () => {
    if (document.documentElement.clientWidth <= 768) {
      menu.style.transform = `translate(-100%)`;
      return;
    }
    // анимация закрывания
    const animationMenu = requestAnimationFrame(anim);

    function anim() {
      let count = 100;
      const timerMenu = setInterval(() => {
        if (count > -100) {
          count -= 2;
          menu.style.transform = `translate(${count}%)`;
        } else {
          clearInterval(timerMenu);
          cancelAnimationFrame(animationMenu);
        }
      }, 10);
    }
  };

  btnMenu.addEventListener("click", handlerMenu);
  closeMenu.addEventListener("click", close);
  itemMenu.forEach((elem) => elem.addEventListener("click", close));

  // POPUP окно

  const togglePopUp = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn"),
      closePopup = document.querySelector(".popup-close");

    popupBtn.forEach((item) => {
      item.addEventListener("click", () => {
        popup.style.display = "block";

        const animationPopup = requestAnimationFrame(anim);
        function anim() {
          let count = 0;
          const timerPopup = setInterval(() => {
            if (count < 100) {
              count += 6;
              popup.style.opacity = `${count * 0.01}`;
            } else {
              clearInterval(timerPopup);
              cancelAnimationFrame(animationPopup);
            }
          }, 30);
        }
      });
    });

    closePopup.addEventListener("click", () => {
      popup.style.display = "none";
      popup.style.opacity = 0;
    });
  };
  togglePopUp();

  // прокрутка страницы плавно (на все ссылки с классом scroll)
  {
    const blockLinks = document.querySelectorAll("a.scroll");

    blockLinks.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        event.preventDefault();
        const id = elem.getAttribute("href");
        document.querySelector(id).scrollIntoView({
          behavior: "smooth",
          blocks: "start",
        });
      });
    });
  }
});
