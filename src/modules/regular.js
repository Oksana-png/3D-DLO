const regular = () => {
  const calcInputs = document.querySelectorAll("input.calc-item"),
    inputMessage = document.getElementById("form2-message"),
    inputTel = document.querySelectorAll('input[type="tel"]'),
    inputName = document.querySelectorAll('input[name="user_name"]'),
    inputEmail = document.querySelectorAll('input[type="email"]'),
    allInput = document.querySelectorAll("input");
  const regNumder = /[^0-9]/g,
    regStart = /^-|-$/g,
    regSpace = /\s{2,}/,
    regDef = /-{2,}/g;
  inputTel.forEach((item) => {
    item.addEventListener("input", () => {
      item.value = item.value.replace(/[^0-9\+]/gi, "");
    });
  });
  inputEmail.forEach((item) => {
    item.addEventListener("blur", () => {
      // item.value = item.value.replace(/^\w+@\w+\.\w{2,3}$/, "");
    });
    item.addEventListener("input", () => {
      if (/^\w+@\w+\.\w{2,3}$/.test(item)) {
        item.setCustomValidity("email@email.ru");
      }
    });
  });
  inputName.forEach((item) => {
    item.addEventListener("blur", () => {
      item.value = item.value.replace(/[^а-я -]{2,50}/gi, "");
    });
    item.addEventListener("input", () => {
      item.value = item.value.replace(/[^а-я -]{2,50}/i, "");
    });
    item.value = item.value.replace(/[^.]/gi, (match) => match.toLowerCase());
    item.value = item.value.replace(/^.{1}/, (match) => match.toUpperCase());
  });
  calcInputs.forEach((item) => {
    item.addEventListener("blur", () => {
      item.value = item.value.replace(regNumder, "");
    });
  });
  allInput.forEach((item) => {
    item.addEventListener("blur", () => {
      item.value = item.value.replace(regSpace, " ");
      item.value = item.value.replace(regDef, "-");
      item.value = item.value.trim();
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
};
export default regular;
