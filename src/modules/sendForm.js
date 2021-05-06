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
  const postData = (body) =>
    fetch("server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  const g = (data, form) => {
    const body = {};
    data.forEach((val, i) => {
      body[i] = val;
    });
    postData(body)
      .then((responce) => {
        console.log(responce);
        if (responce.status !== 200) {
          throw new Error("status network not 200");
        }
        document.querySelector(".overlay-loader").remove();
        form.append(successMessage);
      })
      .catch((error) => {
        console.error(error);
        document.querySelector(".overlay-loader").remove();
      });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.querySelector('input[type="email"]'),
      tel = form.querySelector('input[type="tel"]'),
      name = form.querySelector('input[name="user_name"]');
    if (
      /^\w+@\w+\.\w{2,3}$/.test(email.value) &&
      /(^\+[\d]{11,})|(^[\d]{11,})/.test(tel.value) &&
      /[а-я -]{2,50}/i.test(name.value)
    ) {
      form.append(loader);
      const formData = new FormData(form); // для записи нужен обязательно атрибут name - он будет являться ключем
      g(formData, form);
      document.querySelectorAll("#form1 input").forEach((item) => {
        item.value = "";
      });
    } else {
      alert("Введите валидные данные!");
      return;
    }
  });
  form2.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form2.querySelector('input[type="email"]'),
      tel = form2.querySelector('input[type="tel"]'),
      name = form2.querySelector('input[name="user_name"]');
    if (
      /^\w+@\w+\.\w{2,3}$/.test(email.value) &&
      /(^\+[\d]{11,})|(^[\d]{11,})/.test(tel.value) &&
      /[а-я -]{2,50}/i.test(name.value)
    ) {
      document.querySelector(".connect").after(loader);
      const formData = new FormData(form2); // для записи нужен обязательно атрибут name - он будет являться ключем
      g(formData, form2);
      document.querySelectorAll("#form2 input").forEach((item) => {
        item.value = "";
      });
    } else {
      alert("Введите валидные данные!");
      return;
    }
  });
  form3.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form3.querySelector('input[type="email"]'),
      tel = form3.querySelector('input[type="tel"]'),
      name = form3.querySelector('input[name="user_name"]');
    if (
      /^\w+@\w+\.\w{2,3}$/.test(email.value) &&
      /(^\+[\d]{11,})|(^[\d]{11,})/.test(tel.value) &&
      /[а-я -]{2,50}/i.test(name.value)
    ) {
      form3.append(loader);
      const formData = new FormData(form3); // для записи нужен обязательно атрибут name - он будет являться ключем
      g(formData, form3);
      document.querySelectorAll("#form3 input").forEach((item) => {
        item.value = "";
      });
    } else {
      alert("Введите валидные данные!");
      return;
    }
  });
};

export default sendForm;
