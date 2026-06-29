// Função de delay para aguardar um determinado tempo antes de executar a próxima ação
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Função para diminuir o tamanho da font dos números sorteados quando mais de 2 dígitos
export function fitNumberFontSize(element, maxFontSize = 4, minFontSize = 0.625, maxDigits = 2) {
    const text = element.textContent.trim();
    const digits = text.length;

    if (digits <= maxDigits) {
        element.style.fontSize = `${maxFontSize}rem`;
        return;
    };

    const newSize = maxFontSize * (maxDigits / digits);
    const finalSize = Math.max(newSize, minFontSize);

    element.style.fontSize = `${finalSize}rem`;
};

// Função para diminuir o tamanho da font dos números dos inputs quando mais de 3 dígitos
export function fitInputFontSize(element, maxFontSize = 2, minFontSize = 0.625, maxDigits = 3) {
    const value = element.value.trim();
    const digits = value.length;

    if (digits <= maxDigits) {
        element.style.fontSize = `${maxFontSize}rem`;
        return;
    };

    const newSize = maxFontSize * (maxDigits / digits);
    const finalSize = Math.max(newSize, minFontSize);

    element.style.fontSize = `${finalSize}rem`;
};

// Função para restringir os inputs a dígitos numéricos
export function restrictToDigits(inputs) {
    inputs.forEach(input => {
        input.addEventListener("input", (event) => {
            input.value = input.value.replace(/\D/g, "");
            fitInputFontSize(input);
        });
    });
};

export function disableFormSubmit(form) {
    form.onsubmit = (event) => {
        event.preventDefault();
    };
};

// Função para validações de entrada
export function validateRange(quantity, min, max, unique) {
    if (quantity <= 0 || min > max) {
        console.log("Erro!");
        return false;
    };
    
    if (unique && quantity > max - min + 1) {
        console.log("Erro!");
        return false;
    };
};

export function makeButtonVisible() {
    
};

export function makeButtonInvisible() {
    
};