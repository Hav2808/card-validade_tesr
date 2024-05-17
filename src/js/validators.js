export function isValidInn(inn) {
  if (inn.length === 10 || inn.length === 12) {
    const checkDigit = Number(inn.slice(-1));
    const digits = inn.slice(0, -1).split("").map(Number);
    // Ваша логика валидации ИНН
    return true; // или false в зависимости от результата валидации
  }
  return false; // Если длина ИНН не равна 10 или 12
}
