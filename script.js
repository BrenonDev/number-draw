const form = document.querySelector("form");
const inputs = document.querySelectorAll("input[type='text']");
const quantity = document.querySelector("input#quantity");
const min = document.querySelector("input#min");
const max = document.querySelector("input#max");
const unique = document.querySelector("input#unique");
const button = document.querySelector("button[type='submit']")

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

// Função de sorteio
function random(quantity, min, max) {

    // Converte todos os valores para número
    quantity = Number(quantity);
    min = Number(min);
    max = Number(max);

    // Cria a vetor de números
    let numbers = [];

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

    console.log(numbers);
    
    return numbers;
}

// Chamada da função no click do usuário
button.addEventListener("click", () => {
    random(quantity.value, min.value, max.value).value;
})
