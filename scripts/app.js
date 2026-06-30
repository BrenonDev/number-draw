import { elements, startTheDraw, resetTheDraw } from "./ui.js";
import { state } from "./state.js";
import { generateNumbers } from "./randomizer.js";
import { delay, disableFormSubmit, restrictToDigits, validateRange } from "./utils.js";
import { animateHeightChange, animateItemMovement, animateNumberEntry } from "./animations.js";

// Função de inicialização da aplicação
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

                if (validateRange(state.quantity, state.min, state.max, state.unique)) {
                    state.resultNumbers = [];
                    state.resultNumbers = generateNumbers(state.quantity, state.min, state.max, state.unique);
                    state.resultCounter++;
                    state.previousResultNumbers.push(state.resultNumbers);
                    state.totalAnimationDuration = state.resultNumbers.length * state.individualAnimationDuration;
                } else {
                    return null;
                }

                await animateHeightChange(elements.main, async () => {
                    startTheDraw();
                    await delay(state.layoutChangeDuration / 2);
                });

                await delay(state.layoutChangeDuration / 2);
            
                state.resultNumbers.forEach((number, index) => {
                    setTimeout(() => {
                        animateItemMovement(elements.result, () => {
                            animateNumberEntry(number, elements.result);
                        }, animatedElements);
                    }, index * state.individualAnimationDuration);
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