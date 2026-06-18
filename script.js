const form = document.querySelector("form");
const inputs = document.querySelectorAll("input[type='text']");
const quantity = document.querySelector("input#quantity");
const min = document.querySelector("input#min");
const max = document.querySelector("input#max");
const unique = document.querySelector("input#unique");
const main = document.querySelector("main");
const titleForm = document.querySelector(".title-form");
const resultTitle = document.querySelector(".title-form h2");
const resultSubtitle = document.querySelector(".title-form p");
const result = document.querySelector(".result");
const inputsWrapper = document.querySelector(".inputs-wrapper");
const buttonGradientBorder = document.querySelector(".border-gradient.button");
const button = document.querySelector("button[type='submit']");
const buttonText = document.querySelector("button[type='submit'] span");
const buttonIcon = document.querySelector("button[type='submit'] img");
const questions = document.querySelector(".questions");
const previousResultTitle = resultTitle.textContent;
const previousResultSubtitle = resultSubtitle.textContent;
const previousButtonText = buttonText.textContent;
const previousButtonIcon = buttonIcon.getAttribute("src");
const animatedLayoutElements = [titleForm, questions];
let resultCounter = 0;


// Previne o comportamento padrão do formulário
form.onsubmit = (event) => {
    event.preventDefault();
}

// Remove todos os caracteres dos inputs que não são números
inputs.forEach(input => {
    input.addEventListener("input", (event) => {
        input.value = input.value.replace(/\D/g, "");
        fitInputFontSize(input);
    })
});

// Função para apresentar o resultado do sorteio
async function resultAppearOrResetDraw() {

    const buttonAction = button.className;

    // Animação de transição de layout para o resultado aparecer ou resetar o sorteio
    function animateLayoutChange() {
        form.animate(
            [
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                },
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                },
            ],
            {
                duration: 1000,
                easing: "linear",
                fill: "forwards",
            }
        );
    };
    
    switch (buttonAction) {

        case "start":

            // Remove o estado do botão
            button.classList.remove("start");

            animateLayoutChange();
            await delay(500);

            // Incrementa o contador de resultados para apresentar o número do resultado atual
            resultCounter++;

            // Cria o novo conteúdo dos elementos
            const newResultTitle = "RESULTADO DO SORTEIO";
            const newResultSubtitle = resultCounter + "º RESULTADO";
            const newButtonText = "SORTEAR NOVAMENTE";
            const newButtonIcon = "assets/icon-1.svg";
        
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

            // Adiciona o novo estado do botão
            button.classList.add("reset");
            
            break;
            
        case "reset":

            // Remove o estado do botão
            button.classList.remove("reset");

            animateLayoutChange();
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

            break;
                
        default:
            
            break;
    };
};

// Função para sortear os números com base na quantidade, mínimo e máximo definidos pelo usuário
function random(quantity, min, max) {

    // Converte todos os valores para número
    quantity = Number(quantity);
    min = Number(min);
    max = Number(max);

    // Cria a vetor de números
    let numbers = [];

    // Verifica se a opção para não repetir está ativada, se não ignora a etapa de não permitir números duplicados
    if (unique.checked) {
        
        // Verifica se a quantidade de números a ser gerada não ultrapassa a quantidade possível com base no intervalo
        if (quantity > max - min + 1) {
            alert("Não é possível sortear essa quantidade sem repetir números. Reduza a quantidade ou aumente o intervalo.");
            return
        };
        // Gera os números aleatoriamente
        for (let i = 0; i < quantity; i++) {
            let number = Math.floor(Math.random() * (max - min + 1)) + min;
            
            if (numbers.includes(number)) {
                i--;
            } else {
                numbers.push(number);
            };
        };
    } else {
        // Gera os números aleatoriamente
        for (let i = 0; i < quantity; i++) {
            let number = Math.floor(Math.random() * (max - min + 1)) + min;

            numbers.push(number);
        };

    };

    numbers.sort((a, b) => a - b);

    return numbers;
}

// Função para diminuir o tamanho da font dos números sorteados quando mais de 2 dígitos
function fitNumberFontSize(element, maxFontSize = 4, minFontSize = 0.625, maxDigits = 2) {
    const text = element.textContent.trim();
    const digits = text.length;

    if (digits <= maxDigits) {
        element.style.fontSize = `${maxFontSize}rem`;
        return;
    };

    const newSize = maxFontSize * (maxDigits / digits);
    const finalSize = Math.max(newSize, minFontSize);

    element.style.fontSize = `${finalSize}rem`;
}

// Função para diminuir o tamanho da font dos números dos inputs quando mais de 3 dígitos
function fitInputFontSize(element, maxFontSize = 2, minFontSize = 0.625, maxDigits = 3) {
    const value = element.value.trim();
    const digits = value.length;

    if (digits <= maxDigits) {
        element.style.fontSize = `${maxFontSize}rem`;
        return;
    };

    const newSize = maxFontSize * (maxDigits / digits);
    const finalSize = Math.max(newSize, minFontSize);

    element.style.fontSize = `${finalSize}rem`;
}

// Função de animação dos números sorteados
function createAnimatedItem(text, container) {
    const item = document.createElement("div");
    const card = document.createElement("div");
    const content = document.createElement("span");

    item.classList.add("item");
    card.classList.add("item-card");

    content.textContent = text;

    fitNumberFontSize(content);

    card.appendChild(content);
    item.appendChild(card);
    container.appendChild(item);

    card.animate(
        [
            {
                opacity: 0,
                transform: "scale(0) rotate(0deg)",
            },
            {
                opacity: 1,
                transform: "scale(1) rotate(0deg)",
            },
            {
                opacity: 1,
                transform: "scale(1) rotate(0deg)",
            },
            {
                opacity: 1,
                transform: "scale(1) rotate(90deg)",
            },
            {
                opacity: 1,
                transform: "scale(1) rotate(180deg)",
                backgroundColor: "var(--content-brand)",
            },
            {
                opacity: 1,
                transform: "scale(.9) rotate(180deg)",
                backgroundColor: "transparent",
            },
        ],
        {
            duration: 2000,
            easing: "linear",
            fill: "forwards",
            delay: 500,
        }
    );

    content.animate(
        [
            {
                opacity: 0,
                transform: "rotate(0deg)",
            },
            {
                opacity: 0,
                transform: "rotate(0deg)",
            },
            {
                opacity: 0,
                transform: "rotate(0deg)",
            },
            {
                opacity: 0.75,
                transform: "rotate(-90deg)",
            },
            {
                opacity: 1,
                transform: "rotate(-180deg)",
                color: "initial",
            },
            {
                opacity: 1,
                transform: "rotate(-180deg)",
                color: "var(--content-brand)",
            },
        ],
        {
            duration: 2000,
            easing: "linear",
            fill: "forwards",
            delay: 500,
        }
    );
};

async function animateLayoutChange(container, callback, animatedElements = []) {
    const previousPositions = new Map();
    const previousElementPositions = new Map();

    container.querySelectorAll(".item").forEach((item) => {
        previousPositions.set(item, item.getBoundingClientRect());
    });

    animatedElements.forEach((element) => {
        if (!element) {
            return;
        };

        previousElementPositions.set(element, element.getBoundingClientRect());
    });

    await callback();

    container.querySelectorAll(".item").forEach((item) => {
        const previousPosition = previousPositions.get(item);

        if (!previousPosition) {
            return;
        };

        const currentPosition = item.getBoundingClientRect();

        const deltaX = previousPosition.left - currentPosition.left;
        const deltaY = previousPosition.top - currentPosition.top;

        if (deltaX === 0 && deltaY === 0) {
            return;
        };

        item.animate(
            [
                {
                    transform: `translate(${deltaX}px, ${deltaY}px)`
                },
                {
                    transform: "translate(0, 0)"
                }
            ],
            {
                duration: 400,
                easing: "ease",
                fill: "both",
            }
        );
    });

    animatedElements.forEach((element) => {
        const previousPosition = previousElementPositions.get(element);

        if (!previousPosition) {
            return;
        };

        const currentPosition = element.getBoundingClientRect();

        const deltaX = previousPosition.left - currentPosition.left;
        const deltaY = previousPosition.top - currentPosition.top;

        if (deltaX === 0 && deltaY === 0) {
            return;
        };

        element.animate(
            [
                {
                    transform: `translate(${deltaX}px, ${deltaY}px)`
                },
                {
                    transform: "translate(0, 0)"
                }
            ],
            {
                duration: 400,
                easing: "ease",
                fill: "both",
            }
        );
    });
};

async function animateHeightChange(element, callback) {
    const shouldAnimateHeight = window.matchMedia("(max-width: 52.999em)").matches;

    if (!shouldAnimateHeight) {
        await callback();
        return;
    };

    const previousHeight = element.getBoundingClientRect().height;
    const previousHeightStyle = element.style.height;
    const previousOverflowY = element.style.overflowY;

    await callback();

    const currentHeight = element.getBoundingClientRect().height;

    if (previousHeight === currentHeight) {
        return;
    };

    element.style.height = `${currentHeight}px`;
    element.style.overflowY = "hidden";

    const animation = element.animate(
        [
            {
                height: `${previousHeight}px`
            },
            {
                height: `${currentHeight}px`
            }
        ],
        {
            duration: 400,
            easing: "ease",
        }
    );

    try {
        await animation.finished;
    } finally {
        animation.cancel();
        element.style.height = previousHeightStyle;
        element.style.overflowY = previousOverflowY;
    };
};

// Função de delay para aguardar um determinado tempo antes de executar a próxima ação
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function validateInputs() {
    const quantityValue = Number(quantity.value);
    const minValue = Number(min.value);
    const maxValue = Number(max.value);
}

// Chamada da função no click do usuário
button.addEventListener("click", async () => {
    
    const buttonAction = button.className;
    
    switch (buttonAction) {
        
        case "start":
            
            await animateHeightChange(main, async () => {
                button.blur();
                await resultAppearOrResetDraw();
                button.style.display = "none";
                buttonGradientBorder.style.opacity = "0";
            });
            
            const numbers = random(quantity.value, min.value, max.value);
            
            if (!numbers) {
                console.log("Não foi possível gerar os números.");
                return;
            } else {
                console.log("Números gerados com sucesso:");
                console.log(numbers.join(", "));
            }
            
            await delay(1000);
            
            numbers.forEach((item, index) => {
                setTimeout(() => {
                    animateLayoutChange(result, () => {
                        createAnimatedItem(item, result);
                    }, animatedLayoutElements);
                }, index * 3000);
            });
            
            const drawDuration = numbers.length * 3000;
            await delay(drawDuration);

            await delay(1000);
            
            button.style.display = "flex";

            buttonGradientBorder.animate(
                [
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                    },
                    {
                        opacity: 1,
                    },
                ],
                {
                    duration: 1000,
                    easing: "ease",
                    fill: "backwards",
                }
            );

            await delay(500);
            buttonGradientBorder.style.opacity = "1";

            break;
            
        case "reset":

            await animateHeightChange(main, async () => {
                button.blur();
                await resultAppearOrResetDraw();
            });
            
            break;
    
        default:
            break;
    };
});