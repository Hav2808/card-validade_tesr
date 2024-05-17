import { JSDOM } from "jsdom";
import { InnFormWidget } from "../widget";

const { window } = new JSDOM();
global.document = window.document;
global.window = window;

test("widget should add valid class", () => {
  const widget = new InnFormWidget(document.body);

  widget.bindToDOM();

  widget.input.value = "7715964180";

  const submitEvent = new window.Event("submit", { bubbles: true });
  widget.element.dispatchEvent(submitEvent); // Имитация отправки формы

  expect(widget.input.classList.contains("valid")).toEqual(true);
});

test("widget should add invalid class and remove valid class for invalid input", () => {
  const widget = new InnFormWidget(document.body);

  widget.bindToDOM();

  widget.input.value = "invalid_inn";

  const submitEvent = new window.Event("submit", { bubbles: true });
  widget.element.dispatchEvent(submitEvent); // Имитация отправки формы с неверным ИНН

  // Проверка, что класс 'invalid' добавлен и класс 'valid' удален
  expect(widget.input.classList.contains("invalid")).toEqual(true);
  expect(widget.input.classList.contains("valid")).toEqual(false);
});

test("should add invalid class if value is not numeric", () => {
  const widget = new InnFormWidget(document.body);

  widget.bindToDOM();

  widget.input.value = "abc"; // Неверный формат

  const submitEvent = new window.Event("submit", { bubbles: true });
  widget.element.dispatchEvent(submitEvent); // Имитация отправки формы с неверным форматом

  // Проверка, что класс 'invalid' добавлен и класс 'valid' удален
  expect(widget.input.classList.contains("invalid")).toEqual(true);
  expect(widget.input.classList.contains("valid")).toEqual(false);
});

test("should add invalid class if value is empty", () => {
  const widget = new InnFormWidget(document.body);

  widget.bindToDOM();

  widget.input.value = ""; // Пустое значение

  const submitEvent = new window.Event("submit", { bubbles: true });
  widget.element.dispatchEvent(submitEvent); // Имитация отправки формы с пустым значением

  // Проверка, что класс 'invalid' добавлен и класс 'valid' удален
  expect(widget.input.classList.contains("invalid")).toEqual(true);
  expect(widget.input.classList.contains("valid")).toEqual(false);
});

describe("InnFormWidget", () => {
  let widget;

  beforeEach(() => {
    document.body.innerHTML = "<div id='parent'></div>";
    widget = new InnFormWidget(document.getElementById("parent"));
    widget.bindToDOM();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("adds invalid class and removes valid class on input", () => {
    const input = document.querySelector(".input");
    input.classList.add("valid");

    expect(input.classList.contains("valid")).toBe(true);
    expect(input.classList.contains("invalid")).toBe(false);

    widget.onSubmit(); // assuming onSubmit method is triggered

    expect(input.classList.contains("valid")).toBe(false);
    expect(input.classList.contains("invalid")).toBe(true);
  });
});
