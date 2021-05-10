"Use strict";

class SliderCarousel {
  constructor({
    main,
    wrap,
    slides,
    next,
    prev,
    position = 0,
    slidesToShow = 1,
    infiniti = true,
    responsive = [],
  }) {
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = document.querySelectorAll(slides);
    this.prev = document.querySelector(next);
    this.next = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    this.options = {
      position,
      infiniti,
      widthSlide: Math.floor(100 / this.slidesToShow),
      maxSlide: this.slides.length - this.slidesToShow,
    };
    this.responsive = responsive;
  }
  init() {
    if (!this.main || !this.wrap) {
      console.warn("slider-carusel: Необходимо 2 свойства, 'main' и 'wrap'");
    }
    this.addGloClass();
    this.addStyle();
    if (this.next && this.prev) {
      this.controlSlider();
    } else {
      this.addArrow();
    }
    if (this.responsive) {
      this.responsInit();
    }
  }
  addGloClass() {
    this.main.classList.add("glo-slider");
    this.wrap.classList.add("glo-slider__wrap");
    for (const slide of this.slides) {
      slide.classList.add("glo-slider__item");
    }
  }
  addStyle() {
    let style = document.getElementById("sliderCarousel-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "sliderCarousel-style";
    }
    style.textContent = `
            .glo-slider {
              overflow: hidden;
            }
            .glo-slider__wrap {
              display: flex;
              transition: transform 0.5s;
              will-change: transform;
            }
            .glo-slider__item {
              display: flex;
              flex: 0 0 ${this.options.widthSlide}%;
              margin: auto 0;
              opacity: 1 !important;
              height: 775px !important;
              position: relative;
              top: inherit;
              left: inherit;
              transform: translate(0, 0);
            }
        `;
    document.head.append(style);
  }
  controlSlider() {
    this.prev.addEventListener("click", this.nextSlider.bind(this));
    this.next.addEventListener("click", this.prevSlider.bind(this));
  }
  prevSlider() {
    if (this.options.infiniti || this.options.position > 0) {
      --this.options.position;
      if (this.options.position < 0) {
        this.options.position = this.options.maxSlide;
      }
      this.wrap.style.transform = `translateX(-${
        this.options.position * this.options.widthSlide
      }%)`;
    }
  }
  nextSlider() {
    if (
      this.options.infiniti ||
      this.options.position < this.options.maxSlide
    ) {
      ++this.options.position;
      if (this.options.position > this.options.maxSlide) {
        this.options.position = 0;
      }
      this.wrap.style.transform = `translateX(-${
        this.options.position * this.options.widthSlide
      }%)`;
    }
  }
  addArrow() {
    this.prev = document.createElement("button");
    this.next = document.createElement("button");

    this.prev.className = "glo-slider__prev";
    this.next.className = "glo-slider__next";

    this.main.append(this.prev);
    this.main.append(this.next);

    const style = document.createElement("style");
    style.textContent = `
    .glo-slider__prev,
    .glo-slider__next{
      margin: 0 10px;
      border: 20px solid transparent;
      background: transparent;
    }
    .glo-slider__next {
      border-left-color: #19b5fe;
    }
    .glo-slider__prev {
      border-right-color: #19b5fe;
    }
    .glo-slider__prev:hover,
    .glo-slider__prev:hover,
    .glo-slider__prev:focus,
    .glo-slider__prev:focus {
      background: transparent;
      outline: transparent;
    }
    `;
    document.head.append(style);
    this.controlSlider();
  }
  responsInit() {
    const sliderToShowDefault = this.slidesToShow;
    const allResponse = this.responsive.map((item) => item.breakpoint);
    const maxResponse = Math.max(...allResponse);

    const checkResponse = () => {
      const widthWindow = document.documentElement.clientWidth;
      if (widthWindow < maxResponse) {
        for (let i = 0; i < allResponse.length; i++) {
          if (widthWindow < allResponse[i]) {
            this.slidesToShow = this.responsive[i].slideToShow;
            this.options.widthSlide = Math.floor(100 / this.slidesToShow);
            this.addStyle();
          }
        }
      } else {
        this.slidesToShow = sliderToShowDefault;
        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
        this.addStyle();
      }
    };
    checkResponse();

    window.addEventListener("resize", checkResponse);
  }
}
