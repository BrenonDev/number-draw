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
const animatedElements = [titleForm, questions];
let resultCounter = 0;











// function validateInputs() {
//     const quantityValue = Number(quantity.value);
//     const minValue = Number(min.value);
//     const maxValue = Number(max.value);
// }

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
            
            const numbers = generateNumbers(quantity.value, min.value, max.value);
            
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
                    animateItemMovement(result, () => {
                        animateNumberEntry(item, result);
                    }, animatedElements);
                }, index * 3000);
            });
            
            const drawDuration = numbers.length * 3000;
            await delay(drawDuration);

            await delay(1000);
            
            button.style.display = "flex";

            animateTransparent(buttonGradientBorder)

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