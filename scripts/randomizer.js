// Função para sortear os números com base na quantidade, mínimo e máximo definidos pelo usuário
export function generateNumbers(quantity, min, max, unique) {
  const safeQuantity = Number(quantity);
  const safeMin = Number(min);
  const safeMax = Number(max);

  if (!validateRange(safeQuantity, safeMin, safeMax, unique)) {
    return null;
  }

  const numbers = [];

  if (unique) {
    while (numbers.length < safeQuantity) {
      const number = Math.floor(Math.random() * (safeMax - safeMin + 1)) + safeMin;

      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }
  } else {
    for (let i = 0; i < safeQuantity; i++) {
      const number = Math.floor(Math.random() * (safeMax - safeMin + 1)) + safeMin;
      numbers.push(number);
    }
  }

  return numbers.sort((a, b) => a - b);
}

// Função para validações de entrada
export function validateRange(quantity, min, max, unique) {
    if (quantity <= 0 || min > max) {
        return false;
    }

    if (unique && quantity > max - min + 1) {
        return false;
    }
}