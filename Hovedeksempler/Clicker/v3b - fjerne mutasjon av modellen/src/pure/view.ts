import type { Model } from '../types';

/*
A pure function is a function that, given the same input, 
will always return the same output and does not have any 
observable side effect.
*/

export function updateView(model: Model, handleEvent: Function): HTMLElement {
    const smiley: string = model.smileyIndex == 0 ? '😀' : '😁';

    const mainElement: HTMLElement = document.createElement('div');
    const image: HTMLElement = document.createElement('div');
    const pointsInfo: HTMLElement = document.createElement('div');
    image.textContent = smiley;
    pointsInfo.textContent = '' + model.points;
    mainElement.append(image, pointsInfo);
    if (model.points >= 10) {
        const upgrade: HTMLElement = document.createElement('button');
        upgrade.textContent = 'Kjøp oppgradering (10 poeng)';
        mainElement.append(upgrade);
        upgrade.addEventListener('click', () => handleEvent('buyUpgrade'));
    }

    image.addEventListener('click', () => handleEvent('click'));

    return mainElement;
}

