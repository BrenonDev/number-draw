import { elements, startTheDraw, resetTheDraw } from "./ui.js";
import { state } from "./state.js";
import { generateNumbers } from "./randomizer.js";
import { delay, disableFormSubmit, restrictToDigits, validateRange } from "./utils.js";
import { animateAppear, animateHeightChange, animateItemMovement, animateNumberEntry } from "./animations.js";

export function initApp() {
    
    restrictToDigits(elements.inputs);

    disableFormSubmit(elements.form);

    const animatedElements = [elements.titleForm, elements.questions];
    
    elements.button.addEventListener("click", async () => {
        
        switch (state.buttonMode) {
            
            case "start":

                state.quantity = Number(elements.quantity.value);
                state.min = Number(elements.min.value);
                state.max = Number(elements.max.value);
                state.unique = Boolean(elements.unique.checked);

                if (!validateRange(state.quantity, state.min, state.max, state.unique)) {
                    return null;
                };

                await animateHeightChange(elements.main, async () => {
                    startTheDraw();
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
                
                break;
                
            case "reset":

                await animateHeightChange(elements.main, async () => {
                    await resetTheDraw();
                });

                break;
                    
            default:
                
                break;
        };
    });
};