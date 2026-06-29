import { validateRange } from "./utils.js";
import { state } from "./state.js";

// Função para sortear os números com base na quantidade, mínimo e máximo definidos pelo usuário
export function generateNumbers(quantity, min, max, unique) {

    if (!validateRange(quantity, min, max, unique)) {
        return null;
    };

    state.resultNumbers = [];

    if (unique) {
        while (state.resultNumbers.length < quantity) {
            const number = Math.floor(Math.random() * (max - min + 1)) + min;

            if (!state.resultNumbers.includes(number)) {
                state.resultNumbers.push(number);
            };
        };
    } else {
        for (let i = 0; i < quantity; i++) {
            const number = Math.floor(Math.random() * (max - min + 1)) + min;
            state.resultNumbers.push(number);
        };
    };

    return state.resultNumbers.sort((a, b) => a - b);
};