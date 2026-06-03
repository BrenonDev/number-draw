const form = document.querySelector("form");
const inputs = document.querySelectorAll("input[type='text']");
const quantity = document.querySelector("input#quantity");
const min = document.querySelector("input#quantity");
const max = document.querySelector("input#quantity");
const unique = document.querySelector("input#unique");
const button = document.querySelector("button[type='submit']")

console.log(inputs);

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
    let numbers = [];

    if (quantity > max - min + 1) {
        console.log("Esta quantidade não é possível gerar sem repetição dos números");
        return
    }

    for (let i = 0; i < quantity; i++) {
        let number = Math.floor(Math.random() * (max - min + 1)) + min;

        console.log(numbers.includes(number));
        
        if (numbers.includes(number)) {
            i--;
        } else {
            numbers.push(number);
            
        }
    }

    return numbers
}
// button.preven
// button.addEventListener("click")

// let n = random(10, 1, 10);

// console.log(n);
