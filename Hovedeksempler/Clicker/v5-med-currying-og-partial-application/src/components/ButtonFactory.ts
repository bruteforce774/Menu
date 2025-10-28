// export function BuyUpgradeButton(handleEvent: Function): HTMLElement {
//     const element: HTMLElement = document.createElement('button');
//     element.textContent = 'Kjøp oppgradering (10 poeng)';
//     element.addEventListener('click', () => handleEvent('buyUpgrade'));
//     return element;
// }

// CALCULATION: Curried pure function that creates button factories
// Each step returns a new function without side effects
// The final button creation attaches event listeners, but the factory itself is pure
const buttonFactory =
    (label: string) =>
    (eventName: string) =>
    (dispatch: (event: string) => void): HTMLButtonElement => {
        const element = document.createElement('button');
        element.textContent = label;
        // ACTION: addEventListener registers a callback (side effect when clicked)
        element.addEventListener('click', () => dispatch(eventName));
        return element;
    };

// CALCULATION: Partially applied functions - pure until dispatch is provided
export const BuyUpgradeButton = buttonFactory('Kjøp oppgradering (10 poeng)')('buyUpgrade');
export const BuySuperUpgradeButton = buttonFactory('Kjøp super oppgradering (100 poeng)')('buySuperUpgrade');
export const RandomUpgradeDowngradeButton = buttonFactory('Tilfeldig oppgradering/nedgradering (random opp til +-1000 poeng)')('upgradeDowngrade');

// koden over kan forklares slik:
// 1. buttonFactory er en funksjon som tar tre argumenter, men de er delt opp i tre nivåer (currying).
// 2. Det første nivået tar en label (knappetekst) og returnerer en ny funksjon.
// 3. Det andre nivået tar et eventName (navn på hendelsen) og returnerer enda en funksjon.
// 4. Det tredje nivået tar en dispatch-funksjon (for å håndtere hendelser) og returnerer en HTMLButtonElement.
// 5. Når vi kaller buttonFactory med 'Kjøp oppgradering (10 poeng)' og 'buyUpgrade', får vi en ny funksjon som bare trenger dispatch-funksjonen for å lage knappen.
// 6. Dette gjør det enkelt å lage flere knapper med forskjellige etiketter og hendelser ved å gjenbruke buttonFactory-funksjonen med partial application.
