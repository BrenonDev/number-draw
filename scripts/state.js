// Estado da aplicação
export const state = {
    quantity: 0,
    min: 0,
    max: 0,
    unique: true,

    previousResultTitle: "QUERO SORTEAR:",
    previousResultSubtitle: 'Defina a quantidade de números e o intervalo, clique em "Sortear" e veja os resultados na tela. É rápido e fácil!',
    previousButtonText: "SORTEAR",
    previousButtonIcon: "assets/icon-2.svg",

    newResultTitle: "RESULTADO DO SORTEIO",
    newResultSubtitle: "º RESULTADO",
    newButtonText: "SORTEAR NOVAMENTE",
    newButtonIcon: "assets/icon-1.svg",

    buttonMode: "start",
    resultCounter: 0,
    resultNumbers: [],
    previousResultNumbers: [],

    layoutChangeDuration: 1000,
    individualAnimationDuration: 3000,
    totalAnimationDuration: 0,
}