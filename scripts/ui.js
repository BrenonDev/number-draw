import { state } from "./state.js";
import { animateAppear, animateLayoutChange } from "./animations.js";
import { delay } from "./utils.js";

// Captura de todos os elementos da interface
export const elements = {
    form: document.querySelector("form"),
    inputs: document.querySelectorAll("input[type='text']"),
    quantity: document.querySelector("#quantity"),
    min: document.querySelector("#min"),
    max: document.querySelector("#max"),
    unique: document.querySelector("#unique"),
    main: document.querySelector("main"),
    resultTitle: document.querySelector(".title-form h2"),
    resultSubtitle: document.querySelector(".title-form p"),
    result: document.querySelector(".result"),
    inputsWrapper: document.querySelector(".inputs-wrapper"),
    buttonGradientBorder: document.querySelector(".border-gradient.button"),
    button: document.querySelector("button[type='submit']"),
    buttonText: document.querySelector("button[type='submit'] span"),
    buttonIcon: document.querySelector("button[type='submit'] img"),
    titleForm: document.querySelector(".title-form"),
    questions: document.querySelector(".questions"),
}

// Função para iniciar o sorteio dos números
export async function startTheDraw() {
    // Remove o estado do botão
    state.buttonMode = "";
    elements.button.blur();

    // Animação na troca de layout
    animateLayoutChange(elements.form);
    await delay(state.layoutChangeDuration / 2);

    // Altera o conteúdo dos elementos
    elements.resultTitle.textContent = state.newResultTitle;
    elements.resultSubtitle.textContent = state.resultCounter + state.newResultSubtitle;
    elements.buttonText.textContent = state.newButtonText;
    elements.buttonIcon.setAttribute("src", state.newButtonIcon);

    // Altera os estilos dos elementos
    elements.resultTitle.style.textAlign = "center";
    elements.resultSubtitle.style.textAlign = "center";
    elements.inputsWrapper.style.display = "none";
    elements.result.style.display = "flex";
    elements.button.style.display = "none";
    elements.buttonGradientBorder.style.opacity = "0";
    
    // Aplicação de delay conforme o tempo de animação total + tempo de mudança de layout
    await delay(state.totalAnimationDuration + state.layoutChangeDuration);
    
    // Animação de aparecer o botão de reiniciar o sorteio
    animateAppear(elements.buttonGradientBorder);
    await delay(state.layoutChangeDuration / 2);
    elements.button.style.display = "flex";
    elements.buttonGradientBorder.style.opacity = "1";

    // Adiciona o novo estado do botão
    state.buttonMode = "reset";
};

// Função para reiniciar o sorteio
export async function resetTheDraw() {
    // Remove o estado do botão
    state.buttonMode = "";
    elements.button.blur();

    // Animação na troca de layout
    animateLayoutChange(elements.form);
    await delay(state.layoutChangeDuration / 2);
    
    // Reseta o conteúdo dos elementos
    elements.resultTitle.textContent = state.previousResultTitle;
    elements.resultSubtitle.textContent = state.previousResultSubtitle;
    elements.buttonText.textContent = state.previousButtonText;
    elements.buttonIcon.setAttribute("src", state.previousButtonIcon);
    
    // Reseta os estilos do elementos
    elements.resultTitle.style.textAlign = "initial";
    elements.resultSubtitle.style.textAlign = "initial";
    elements.inputsWrapper.style.display = "flex";
    elements.result.style.display = "none";
    
    // Limpa os resultados anteriores
    elements.result.replaceChildren();

    // Adiciona o novo estado do botão
    state.buttonMode = "start";
    elements.button.classList.remove('is-animating');
    elements.buttonIcon.classList.remove('is-stopping');
};