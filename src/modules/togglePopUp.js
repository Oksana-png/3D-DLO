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
export default togglePopUp;
