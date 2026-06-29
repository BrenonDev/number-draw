import { validateRange } from "./utils";
import { state } from "./state";

// Função para sortear os números com base na quantidade, mínimo e máximo definidos pelo usuário
export function generateNumbers(quantity, min, max, unique) {

    if (!validateRange(quantity, min, max, unique)) {
        return null;
    };

    if (unique) {
        while (numbers.length < quantity) {
            const number = Math.floor(Math.random() * (max - min + 1)) + min;

            if (!numbers.includes(number)) {
                numbers.push(number);
            };
        };
    } else {
        for (let i = 0; i < quantity; i++) {
            const number = Math.floor(Math.random() * (max - min + 1)) + min;
            numbers.push(number);
        };
    };

    return numbers.sort((a, b) => a - b);
};