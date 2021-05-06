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
      if (target.tagName !== "MENU" && target.tagName !== "LI") {
        close();
      }
    }
  });
};
export default toggleMenu;
