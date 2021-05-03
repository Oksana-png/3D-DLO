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
  const toggleMenu = () => {
    const menu = document.querySelector("menu");

    const handlerMenu = () => {
      if (document.documentElement.clientWidth <= 768) {
        menu.style.transform = `translate(0)`;
        return;
      }
      // menu.classList.toggle("active-menu");
      // анимация появления
      const animationMenu = requestAnimationFrame(anim);
      function anim() {
        let count = -100;
        const timerMenu = setInterval(() => {
          if (count < 0) {
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
        let count = 0;
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
    // делегирование на закрытие и отрытие меню
    document.addEventListener("click", (event) => {
      const target = event.target;

      if (target.closest(".menu")) {
        if (
          menu.style.transform === "translate(0%)" ||
          menu.style.transform === "translate(0px)"
        ) {
          close();
        } else {
          handlerMenu();
        }
      }
      if (
        target.classList.contains("scroll") ||
        target.classList.contains("close-btn")
      ) {
        close();
      }
      // клик мимо меню (закрытие)
      if (menu.style.transform === "translate(0%)") {
        if (target.tagName !== "MENU") {
          close();
        }
      }
    });
  };

  toggleMenu();

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
          if (document.documentElement.clientWidth <= 768) {
            popup.style.opacity = `1`;
            cancelAnimationFrame(animationPopup);
            return;
          }
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

    popup.addEventListener("click", (event) => {
      const target = event.target;
      if (!target.closest(".popup-content")) {
        popup.style.display = "none";
        popup.style.opacity = 0;
      }
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

  // табы

  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = document.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tabContent[i].classList.remove("d-none");
          tab[i].classList.add("active");
        } else {
          tabContent[i].classList.add("d-none");
          tab[i].classList.remove("active");
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab"); // метод поднимается вверх. если не находит - возвращает null

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  // СЛАЙДЕР
  const slider = () => {
    const slide = document.querySelectorAll(".portfolio-item"),
      portfolioDots = document.querySelector(".portfolio-dots"),
      slider = document.querySelector(".portfolio-content");
    let dot = document.querySelectorAll(".dot"),
      currentSlide = 0,
      interval; // номер слайда

    // ДИНАМИЧЕСКИ создаем точки (количество слайдов)
    const createDots = () => {
      let i = 0;
      while (i < slide.length) {
        const dot = document.createElement("li");
        dot.classList.add("dot");

        if (i === 0) {
          dot.classList.add(".dot-active");
        }
        portfolioDots.append(dot);
        i++;
      }
    };
    createDots();
    dot = document.querySelectorAll(".dot");
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active"); // сами слайды
      prevSlide(dot, currentSlide, "dot-active"); // точки

      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active"); // точки
    };
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    // чтоб останавливать при наведении
    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.target;

      if (!target.matches("#arrow-right, #arrow-left, .dot")) {
        return;
      }

      prevSlide(slide, currentSlide, "portfolio-item-active"); // сами слайды
      prevSlide(dot, currentSlide, "dot-active"); // точки

      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((item, i) => {
          if (target === item) {
            currentSlide = i;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      } else if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active"); // точки
    });
    slider.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });
    slider.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide();
      }
    });

    startSlide();
  };
  slider();

  // замена картинки про наведении и обратно
  const hoverEffect = () => {
    const photos = document.querySelectorAll(".command__photo");

    const updatePhoto = (event) => {
      const target = event.target;
      const newUrl = target.dataset.img;

      target.dataset.img = target.src;
      target.src = newUrl;
    };

    const returnPhoto = (event) => {
      const target = event.target;
      const newUrl = target.dataset.img;

      target.dataset.img = target.src;
      target.src = newUrl;
    };
    photos.forEach((item) => {
      item.addEventListener("mouseenter", updatePhoto);
      item.addEventListener("mouseout", returnPhoto);
    });
  };
  hoverEffect();

  const regular = () => {
    const calcInputs = document.querySelectorAll("input.calc-item"),
      footerFormTop = document.querySelectorAll(".top-form"),
      inputMessage = document.getElementById("form2-message"),
      inputTel = document.querySelectorAll('input[type="tel"]'),
      inputName = document.querySelectorAll('input[name="user_name"]');
    const regNumder = /[^0-9]/g,
      regText = /[^а-я\s]/gi,
      regEmail = /[^@\-_\!\*\'~\.a-z]/gi,
      regPhone = /[^0-9\(\)-]/g,
      regStart = /^-|-$/g,
      regSpace = /\s{2,}/,
      regDef = /-{2,}/g;

    inputTel.forEach((item) => {
      item.addEventListener("input", () => {
        item.value = item.value.replace(/[^0-9\+]/gi, "");
      });
    });
    inputName.forEach((item) => {
      item.addEventListener("blur", () => {
        item.value = item.value.replace(/[^а-я ]/i, "");
      });
      item.addEventListener("input", () => {
        item.value = item.value.replace(/[^а-я ]/i, "");
      });
    });
    calcInputs.forEach((item) => {
      item.addEventListener("blur", () => {
        item.value = item.value.replace(regNumder, "");
      });
    });

    inputMessage.addEventListener("blur", () => {
      inputMessage.value = inputMessage.value.replace(regSpace, " ");
      inputMessage.value = inputMessage.value.replace(regDef, "-");
      inputMessage.value = inputMessage.value.trim();
      inputMessage.value = inputMessage.value.replace(regStart, "");
    });
    inputMessage.addEventListener("input", () => {
      inputMessage.value = inputMessage.value.replace(
        /[^0-9а-я \.,:\?\!;-]/gi,
        ""
      );
    });

    footerFormTop.forEach((item) => {
      item.addEventListener("blur", (event) => {
        const target = event.target;
        if (target.closest("#form2-name")) {
          target.value = target.value.replace(regText, "");
          target.value = target.value.replace(regSpace, " ");
          target.value = target.value.trim();
          target.value = target.value.replace(/[^.]/gi, (match) =>
            match.toLowerCase()
          );
          target.value = target.value.replace(/^.{1}/, (match) =>
            match.toUpperCase()
          );
        } else if (target.closest("#form2-email")) {
          target.value = target.value.replace(regEmail, "");
          target.value = target.value.replace(regDef, "-");
          target.value = target.value.trim();
          target.value = target.value.replace(regStart, "");
        } else if (target.closest("#form2-phone")) {
          target.value = target.value.replace(regPhone, "");
          target.value = target.value.replace(regDef, "-");
          target.value = target.value.trim();
          target.value = target.value.replace(regStart, "");
        }
      });
    });
  };
  regular();

  // КАЛЬКУЛЯТОР СТОИМОСТИ
  const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcCount = document.querySelector(".calc-count"),
      calcDay = document.querySelector(".calc-day"),
      totalValue = document.getElementById("total");

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = +calcType.options[calcType.selectedIndex].value;
      const squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      if (typeValue && squareValue) {
        total = Math.floor(
          price * typeValue * squareValue * countValue * dayValue
        );
        let i = 1;
        const timerId = setInterval(() => {
          totalValue.textContent = i;
          if (i < total) {
            i += 5;
          } else {
            totalValue.textContent = total;
            clearInterval(timerId);
          }
        }, 1);
      } else {
        calcDay.value = "";
        calcCount.value = "";
        totalValue.textContent = 0;
      }
    };
    calcBlock.addEventListener("change", (event) => {
      const target = event.target;
      if (target.matches("select") || target.matches("input")) {
        countSum();
      }
    });
  };
  calc(100);

  // ОТПРАВКА ФОРМ send-ajax-form

  const sendForm = () => {
    const form = document.getElementById("form1"),
      form2 = document.getElementById("form2"),
      form3 = document.getElementById("form3");
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-modal");
    successMessage.innerHTML = `
      <h3 class="header-success">Спасибо! Ваша заявка отправлена!</h3>
    `;
    const loader = document.createElement("div");
    loader.classList.add("overlay-loader");
    loader.innerHTML = `
      <div class="loader">
        <div class="colu col_1"></div>
        <div class="colu col_2"></div>
        <div class="colu col_3"></div>
        <div class="colu col_4"></div>
        <div class="colu col_5"></div>
        <div class="colu col_6"></div>
        <div class="colu col_7"></div>
        <div class="colu col_8"></div>
      </div>
    `;
    const g = (data, form) => {
      const body = {};
      data.forEach((val, i) => {
        body[i] = val;
      });
      postData(
        body,
        () => {
          document.querySelector(".overlay-loader").remove();
          form.append(successMessage);
        },
        (error) => {
          console.error(error);
          document.querySelector(".overlay-loader").remove();
        }
      );
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.append(loader);
      const formData = new FormData(form); // для записи нужен обязательно атрибут name - он будет являться ключем
      g(formData, form);
      document.querySelectorAll("#form1 input").forEach((item) => {
        item.value = "";
      });
    });
    form2.addEventListener("submit", (event) => {
      event.preventDefault();
      document.querySelector(".connect").after(loader);
      const formData = new FormData(form2); // для записи нужен обязательно атрибут name - он будет являться ключем
      g(formData, form2);
      document.querySelectorAll("#form2 input").forEach((item) => {
        item.value = "";
      });
    });
    form3.addEventListener("submit", (event) => {
      event.preventDefault();
      form3.append(loader);
      const formData = new FormData(form3); // для записи нужен обязательно атрибут name - он будет являться ключем
      g(formData, form3);
      document.querySelectorAll("#form3 input").forEach((item) => {
        item.value = "";
      });
    });
  };
  const postData = (body, outputData, errorData) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        outputData();
      } else {
        errorData(request.status);
      }
    });
    request.open("POST", "server.php");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(body));
  };

  sendForm();
});
