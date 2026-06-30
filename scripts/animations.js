import { delay, fitNumberFontSize } from "./utils.js";

// Função de animação dos números sorteados
export function animateNumberEntry(text, container) {
    const item = document.createElement("div");
    const card = document.createElement("div");
    const content = document.createElement("span");

    item.classList.add("item");
    card.classList.add("item-card");
    content.textContent = text;

    fitNumberFontSize(content);

    card.appendChild(content);
    item.appendChild(card);
    container.appendChild(item);

    card.animate(
        [
            {
                opacity: 0,
                transform: "scale(0) rotate(0deg)",
            },
            {
                opacity: 1,
                transform: "scale(1) rotate(0deg)",
            },
            {
                opacity: 1,
                transform: "scale(1) rotate(0deg)",
            },
            {
                opacity: 1,
                transform: "scale(1) rotate(90deg)",
            },
            {
                opacity: 1,
                transform: "scale(1) rotate(180deg)",
                backgroundColor: "var(--content-brand)",
            },
            {
                opacity: 1,
                transform: "scale(.9) rotate(180deg)",
                backgroundColor: "transparent",
            },
        ],
        {
            duration: 2000,
            easing: "linear",
            fill: "forwards",
            delay: 500,
        }
    );

    content.animate(
        [
            {
                opacity: 0,
                transform: "rotate(0deg)",
            },
            {
                opacity: 0,
                transform: "rotate(0deg)",
            },
            {
                opacity: 0,
                transform: "rotate(0deg)",
            },
            {
                opacity: 0.75,
                transform: "rotate(-90deg)",
            },
            {
                opacity: 1,
                transform: "rotate(-180deg)",
                color: "initial",
            },
            {
                opacity: 1,
                transform: "rotate(-180deg)",
                color: "var(--content-brand)",
            },
        ],
        {
            duration: 2000,
            easing: "linear",
            fill: "forwards",
            delay: 500,
        }
    );
};

// Função de animação do movimento dos itens ao serem adicionados
export async function animateItemMovement(container, callback, animatedElements = []) {
    const previousPositions = new Map();
    const previousElementPositions = new Map();

    container.querySelectorAll(".item").forEach((item) => {
        previousPositions.set(item, item.getBoundingClientRect());
    });

    animatedElements.forEach((element) => {
        if (!element) {
            return;
        };

        previousElementPositions.set(element, element.getBoundingClientRect());
    });

    await callback();

    container.querySelectorAll(".item").forEach((item) => {
        const previousPosition = previousPositions.get(item);

        if (!previousPosition) {
            return;
        };

        const currentPosition = item.getBoundingClientRect();

        const deltaX = previousPosition.left - currentPosition.left;
        const deltaY = previousPosition.top - currentPosition.top;

        if (deltaX === 0 && deltaY === 0) {
            return;
        };

        item.animate(
            [
                {
                    transform: `translate(${deltaX}px, ${deltaY}px)`
                },
                {
                    transform: "translate(0, 0)"
                }
            ],
            {
                duration: 400,
                easing: "ease",
                fill: "both",
            }
        );
    });

    animatedElements.forEach((element) => {
        const previousPosition = previousElementPositions.get(element);

        if (!previousPosition) {
            return;
        };

        const currentPosition = element.getBoundingClientRect();

        const deltaX = previousPosition.left - currentPosition.left;
        const deltaY = previousPosition.top - currentPosition.top;

        if (deltaX === 0 && deltaY === 0) {
            return;
        };

        element.animate(
            [
                {
                    transform: `translate(${deltaX}px, ${deltaY}px)`
                },
                {
                    transform: "translate(0, 0)"
                }
            ],
            {
                duration: 400,
                easing: "ease",
                fill: "both",
            }
        );
    });
};

// Função de animação da altura dos elementos conforme mudança de layout
export async function animateHeightChange(element, callback) {
    const shouldAnimateHeight = window.matchMedia("(max-width: 52.999em)").matches;

    if (!shouldAnimateHeight) {
        await callback();
        return;
    };

    const previousHeight = element.getBoundingClientRect().height;
    const previousHeightStyle = element.style.height;
    const previousOverflowY = element.style.overflowY;

    await callback();

    const currentHeight = element.getBoundingClientRect().height;

    if (previousHeight === currentHeight) {
        return;
    };

    element.style.height = `${currentHeight}px`;
    element.style.overflowY = "hidden";

    const animation = element.animate(
        [
            {
                height: `${previousHeight}px`
            },
            {
                height: `${currentHeight}px`
            }
        ],
        {
            duration: 400,
            easing: "ease",
        }
    );

    try {
        await animation.finished;
    } finally {
        animation.cancel();
        element.style.height = previousHeightStyle;
        element.style.overflowY = previousOverflowY;
    };
};

// Animação de transição de layout entre o resultado e o ínicio
export function animateLayoutChange(element) {
    element.animate(
        [
            {
                opacity: 1,
            },
            {
                opacity: 0,
            },
            {
                opacity: 0,
            },
            {
                opacity: 1,
            },
        ],
        {
            duration: 1000,
            easing: "linear",
            fill: "forwards",
        }
    );
};

// Função para animar a transição de opacidade
export async function animateAppear(element) {
    element.animate(
        [
            {
                opacity: 0,
            },
            {
                opacity: 1,
            },
            {
                opacity: 1,
            },
        ],
        {
            duration: 1000,
            easing: "ease",
            fill: "backwards",
        }
    );
};