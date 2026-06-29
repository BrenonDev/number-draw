import { startTheDraw, resetTheDraw } from "./ui";
import { generateNumbers } from "./randomizer";

export function initApp() {

    restrictToDigits(inputs);

    disableFormSubmit(form);

    button.addEventListener("click", async () => {
        

        const buttonAction = button.className;
        
        switch (buttonAction) {

            case "start":

                await animateHeightChange(main, async () => {
                    await startTheDraw()
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
                await delay(drawDuration + 1000);

                animateAppearance(buttonGradientBorder);
                
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
};