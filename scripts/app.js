import { generateNumbers } from "./randomizer"

export function initApp() {
    // Função para apresentar o resultado do sorteio
    // async function resultAppearOrResetDraw() {

    form.onsubmit = (event) => {
        event.preventDefault();
    }

    restrictToDigits()

    button.addEventListener("click", async () => {
        // Previne o comportamento padrão do formulário

        const buttonAction = button.className;
        
        switch (buttonAction) {

            case "start":

                await animateHeightChange(main, async () => {
                    button.blur();
                    await startTheDraw()
                    button.style.display = "none";
                    buttonGradientBorder.style.opacity = "0";
                });

                const numbers = generateNumbers(quantity.value, min.value, max.value);

                // if (!numbers) {
                //     console.log("Não foi possível gerar os números.");
                //     return;
                // } else {
                //     console.log("Números gerados com sucesso:");
                //     console.log(numbers.join(", "));
                // }

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
                    await resetTheDraw()
                });

                break;
                    
            default:
                
                break;
        };
    });
    // };
};