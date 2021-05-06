const scrollLigth = () => {
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
};

export default scrollLigth;
