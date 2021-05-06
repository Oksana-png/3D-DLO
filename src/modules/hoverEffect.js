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
export default hoverEffect;
