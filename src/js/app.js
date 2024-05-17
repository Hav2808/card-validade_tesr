import validate from "./validator";
import paySystem from "./paySystem";

document.querySelector("#card-submit").addEventListener("click", (event) => {
  event.preventDefault();
  const num = document.querySelector("#numberCard-input").value;

  if (!num.match(/^\d+$/)) {
    alert("Введите корректный номер карты (без букв и спецсимволов)");
    return;
  }

  if (validate(num)) {
    paySystem(num);
  } else {
    alert("Не правильный номер карты");
  }
});

document.querySelector("#input-reset").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#card-form").reset();
  document.querySelectorAll(".card-item").forEach((el) => {
    el.classList.remove("active");
  });
});
