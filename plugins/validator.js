class Validator {
  constructor({ selector, pattern = {}, method }) {
    this.form = document.querySelector(selector); // id, class и т.д.
    this.pattern = pattern; // валидация (паттерны)
    this.method = method; // настройки (какие поля должны вадидироваться)
    this.elementsForm = [...this.form.elements].filter(
      (item) =>
        item.tagName.toLowerCase() !== "button" && item.type !== "button"
    );
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach((item) =>
      item.addEventListener("change", this.checkIt.bind(this))
    );
    this.form.addEventListener("submit", (e) => {
      this.elementsForm.forEach((elem) => this.checkIt({ target: elem }));
      if (this.error.size) {
        e.preventDefault();
      }
    });
  }
  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === "") {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        console.log(pattern.test(elem.value));
        return pattern.test(elem.value);
      },
    };
    if (this.method) {
      const method = this.method[elem.id];
      if (method) {
        return method.every((item) =>
          validatorMethod[item[0]](elem, this.pattern[item[1]])
        );
      }
    } else {
      console.warn(
        "Необходимо передать id полей ввода и методы проверки данных полей"
      );
    }

    return true;
  }
  checkIt(event) {
    const target = event.target;
    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.add("error");
    elem.classList.remove("success");
    if (
      elem.nextElementSibling &&
      elem.nextElementSibling.classList.contains("validator-error")
    ) {
      return;
    }
    const errorDiv = document.createElement("div");
    errorDiv.textContent = "Ошибка в данном поле!";
    errorDiv.classList.add("validator-error");
    elem.insertAdjacentElement("afterend", errorDiv);
  }

  showSuccess(elem) {
    elem.classList.add("success");
    elem.classList.remove("error");
    if (
      elem.nextElementSibling &&
      elem.nextElementSibling.classList.contains("validator-error")
    ) {
      elem.nextElementSibling.remove();
    }
  }

  applyStyle() {
    const style = document.createElement("style");
    style.textContent = `
      input.success {
        border: 2px solid green !important;
      }
      input.error {
        border: 2px solid red !important;
      }
      .validator-error {
        font-size: 12px;
        font-family: sans-serif;
        color: red;
      }
    `;
    document.head.append(style);
  }

  setPattern() {
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
    if (!this.pattern.name) {
      this.pattern.name = /[а-я]/gi;
    }
  }
}

// Применения, селектор - форма основня, паттерн - регулярка для нужного типа поля
// метод - какая нужна проверка: notEmpty - на наличие не пустого поля, phone - телефон, email - почта
// const valid = new Validator({
//   selector: "#myform",
//   pattern: {
//     phone: /^\+380\d{7}$/,
//   },
//   method: {
//     phone: [["notEmpty"], ["pattern", "phone"]],
//     email: [["notEmpty"], ["pattern", "email"]],
//   },
// });

// valid.init();
