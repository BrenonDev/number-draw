export const state = {
    quantity: Number(document.querySelector("input#quantity").value),
    min: Number(document.querySelector("input#min").value),
    max: Number(document.querySelector("input#max").value),
    unique: Boolean(document.querySelector("input#unique").checked),

    previousResultTitle: document.querySelector(".title-form h2").textContent,
    previousResultSubtitle: document.querySelector(".title-form p").textContent,
    previousButtonText: document.querySelector("button[type='submit'] span").textContent,
    previousButtonIcon: document.querySelector("button[type='submit'] img").getAttribute("src"),

    newResultTitle: "RESULTADO DO SORTEIO",
    newResultSubtitle: "º RESULTADO",
    newButtonText: "SORTEAR NOVAMENTE",
    newButtonIcon: "assets/icon-1.svg",

    resultCounter: 0,
    result: [],
}