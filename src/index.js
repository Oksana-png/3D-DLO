"Use strict";

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopUp from "./modules/togglePopUp";
import scrollLigth from "./modules/scrollLigth";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import hoverEffect from "./modules/hoverEffect";
import regular from "./modules/regular";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";

// таймер
countTimer("29 april 2021");
// открытие и закрытию меню
toggleMenu();
// POPUP окно
togglePopUp();
// прокрутка страницы плавно (на все ссылки с классом scroll)
scrollLigth();
// табы
tabs();
// СЛАЙДЕР
slider();
// замена картинки про наведении и обратно
hoverEffect();
// валидация с помощью регулярных выражений
regular();
// КАЛЬКУЛЯТОР СТОИМОСТИ
calc(100);
// ОТПРАВКА ФОРМ send-ajax-form
sendForm();
