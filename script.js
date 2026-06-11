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
    })
});

// Função para criar os itens dos números sorteados
function createItems(numbers) {
    numbers.forEach(number => {
        const item = document.createElement("div");
        const text = document.createElement("span");
        
        item.classList.add("item");
        text.textContent = number;
        
        item.append(text);
        result.append(item);
    });
}

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
            console.log("Esta quantidade não é possível gerar sem repetição dos números");
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

    createItems(numbers);

    return;
}

// Função para diminuir o tamanho da font dos números sorteados quando mais de 2 dígitos
// function fitNumberFontSize(element, maxFontSize = 4, minFontSize = 0.625) {
//     const text = element.textContent.trim();
//     const digits = text.lenght;

//     if (digits <= 2) {
//         return
//     }

//     const newSize = maxFontSize * (2 / digits);
// }

// Chamada da função no click do usuário
button.addEventListener("click", () => {
    const numbers = random(quantity.value, min.value, max.value);

    if (numbers) {
        console.log(numbers);
    }
})