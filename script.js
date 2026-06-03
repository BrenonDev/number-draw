const inputs = document.querySelectorAll("input");
const quantity = document.querySelector("input#quantity");
const min = document.querySelector("input#quantity");
const max = document.querySelector("input#quantity");
const unique = document.

document.addEventListener("input", (event) => {

})

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
            i--
        } else {
            numbers.push(number);
            
        }
    }

    return numbers

}

let n = random(10, 1, 10);

console.log(n);
