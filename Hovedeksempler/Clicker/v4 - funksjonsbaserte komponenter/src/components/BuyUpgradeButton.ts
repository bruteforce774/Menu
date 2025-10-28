export function BuyUpgradeButton(handleEvent: Function): HTMLElement {
    const element: HTMLElement = document.createElement('button');
    element.textContent = 'Kjøp oppgradering (10 poeng)';
    element.addEventListener('click', () => handleEvent('buyUpgrade'));
    return element;
}
