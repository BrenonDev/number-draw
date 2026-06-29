import { state } from "./state";

export async function startTheDraw() {
    // Remove o estado do botão
    button.classList.remove("start");
    button.blur();

    animateLayoutChange(form);
    await delay(500);

    // Incrementa o contador de resultados para apresentar o número do resultado atual
    resultCounter++;

    // Cria o novo conteúdo dos elementos
    // const newResultTitle = "RESULTADO DO SORTEIO";
    // const newResultSubtitle = resultCounter + "º RESULTADO";
    // const newButtonText = "SORTEAR NOVAMENTE";
    // const newButtonIcon = "assets/icon-1.svg";

    // Altera o conteúdo dos elementos
    resultTitle.textContent = newResultTitle;
    resultSubtitle.textContent = newResultSubtitle;
    buttonText.textContent = newButtonText;
    buttonIcon.setAttribute("src", newButtonIcon);

    // Altera os estilos dos elementos
    resultTitle.style.textAlign = "center";
    resultSubtitle.style.textAlign = "center";
    inputsWrapper.style.display = "none";
    result.style.display = "flex";

    buttonGradientBorder.style.display = "none";
    buttonGradientBorder.style.opacity = "0";

    // Adiciona o novo estado do botão
    button.classList.add("reset");
}

export async function resetTheDraw() {
    // Remove o estado do botão
    button.classList.remove("reset");
    button.blur();

    animateLayoutChange(form);
    await delay(500);
    
    // Reseta o conteúdo dos elementos
    resultTitle.textContent = previousResultTitle;
    resultSubtitle.textContent = previousResultSubtitle;
    buttonText.textContent = previousButtonText;
    buttonIcon.setAttribute("src", previousButtonIcon);
    
    // Reseta os estilos do elementos
    resultTitle.style.textAlign = "initial";
    resultSubtitle.style.textAlign = "initial";
    inputsWrapper.style.display = "flex";
    result.style.display = "none";
    
    // Limpa os resultados anteriores
    result.replaceChildren();

    // Adiciona o novo estado do botão
    button.classList.add("start");
}

