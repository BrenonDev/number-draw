const form = document.querySelector("form");
const inputs = document.querySelectorAll("input[type='text']");
const quantity = document.querySelector("input#quantity");
const min = document.querySelector("input#min");
const max = document.querySelector("input#max");
const unique = document.querySelector("input#unique");
const button = document.querySelector("button[type='submit']");
const result = document.querySelector(".result");

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
        }
        // Gera os números aleatoriamente
        for (let i = 0; i < quantity; i++) {
            let number = Math.floor(Math.random() * (max - min + 1)) + min;
            
            if (numbers.includes(number)) {
                i--;
            } else {
                numbers.push(number);
            }
        }
    } else {
        // Gera os números aleatoriamente
        for (let i = 0; i < quantity; i++) {
            let number = Math.floor(Math.random() * (max - min + 1)) + min;

            numbers.push(number);
        }

    }

    return numbers;
}

// Função para diminuir o tamanho da font dos números sorteados quando mais de 2 dígitos
function fitNumberFontSize(element, maxFontSize = 4, minFontSize = 0.625, maxDigits = 2) {
    const text = element.textContent.trim();
    const digits = text.length;

    if (digits <= maxDigits) {
        element.style.fontSize = `${maxFontSize}rem`;
        return;
    }

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
    }

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
                transform: "scale(0.75) rotate(0deg)",
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
                transform: "scale(1) rotate(180deg)",
                backgroundColor: "transparent",
            }
        ],
        {
            duration: 3500,
            easing: "linear",
            fill: "forwards",
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
                opacity: 1,
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
            }
        ],
        {
            duration: 3500,
            easing: "linear",
            fill: "forwards",
        }
    );
}


function animateLayoutChange(container, callback) {
    const previousPositions = new Map();

    container.querySelectorAll(".item").forEach((item) => {
        previousPositions.set(item, item.getBoundingClientRect());
    });

    callback();

    container.querySelectorAll(".item").forEach((item) => {
        const previousPosition = previousPositions.get(item);

        if (!previousPosition) {
            return;
        }

        const currentPosition = item.getBoundingClientRect();

        const deltaX = previousPosition.left - currentPosition.left;
        const deltaY = previousPosition.top - currentPosition.top;

        if (deltaX === 0 && deltaY === 0) {
            return;
        }

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
                fill: "both"
            }
        );
    });
}


// Chamada da função no click do usuário
button.addEventListener("click", () => {
    const numbers = random(quantity.value, min.value, max.value);

    if (!numbers) {
        return
    };

    console.log(numbers);

    numbers.forEach((item, index) => {
        setTimeout(() => {
            animateLayoutChange(result, () => {
                createAnimatedItem(item, result);
            });
        }, index * 4000);
    });
})
