import { elements, startTheDraw, resetTheDraw } from "./ui.js";
import { state } from "./state.js";
import { generateNumbers } from "./randomizer.js";
import { delay, disableFormSubmit, restrictToDigits } from "./utils.js";
import { animateAppear, animateHeightChange, animateItemMovement, animateNumberEntry } from "./animations.js";

export function initApp() {
    
    restrictToDigits(elements.inputs);

    disableFormSubmit(elements.form);

    const animatedElements = [elements.titleForm, elements.questions];
    
    elements.button.addEventListener("click", async () => {
        
        state.quantity = Number(elements.quantity.value);
        state.min = Number(elements.min.value);
        state.max = Number(elements.max.value);
        state.unique = Boolean(elements.unique.checked);

        const buttonAction = elements.button.className;
        
        switch (buttonAction) {

            case "start":

                await animateHeightChange(elements.main, async () => {
                    await startTheDraw()
                });

                state.resultNumbers = generateNumbers(state.quantity, state.min, state.max, state.unique);

                if (!state.resultNumbers) {
                    console.log("Não foi possível gerar os números.");
                    return;
                } else {
                    console.log("Números gerados com sucesso:");
                    console.log(state.resultNumbers.join(", "));
                };

                await delay(1000);
            
                state.resultNumbers.forEach((number, index) => {
                    setTimeout(() => {
                        animateItemMovement(elements.result, () => {
                            animateNumberEntry(number, elements.result);
                        }, animatedElements);
                    }, index * 3000);
                });
                
                const drawDuration = state.resultNumbers.length * 3000;
                await delay(drawDuration + 1000);

                animateAppear(elements.buttonGradientBorder);
                
                break;
                
            case "reset":

                await animateHeightChange(elements.main, async () => {
                    elements.button.blur();
                    await resetTheDraw();
                });

                break;
                    
            default:
                
                break;
        };
    });
};