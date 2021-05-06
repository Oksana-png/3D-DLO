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
        dot.classList.add("dot-active");
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
export default slider;
