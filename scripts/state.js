import { elements } from "./ui.js";

export const state = {
    // quantity: Number(elements.quantity.value),
    // min: Number(elements.min.value),
    // max: Number(elements.max.value),
    // unique: Boolean(elements.unique.checked),

    // previousResultTitle: elements.resultTitle.textContent,
    // previousResultSubtitle: elements.resultSubtitle.textContent,
    // previousButtonText: elements.buttonText.textContent,
    // previousButtonIcon: document.newButtonIcon.getAttribute("src"),

    quantity: 1,
    min: 1,
    max: 100,
    unique: true,

    previousResultTitle: "QUERO SORTEAR:",
    previousResultSubtitle: 'Defina a quantidade de números e o intervalo, clique em "Sortear" e veja os resultados na tela. É rápido e fácil!',
    previousButtonText: "SORTEAR",
    previousButtonIcon: "assets/icon-2.svg",

    newResultTitle: "RESULTADO DO SORTEIO",
    newResultSubtitle: "º RESULTADO",
    newButtonText: "SORTEAR NOVAMENTE",
    newButtonIcon: "assets/icon-1.svg",

    resultCounter: 0,
    resultNumbers: [],
}