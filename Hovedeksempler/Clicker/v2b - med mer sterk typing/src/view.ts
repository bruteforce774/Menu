import { model } from './model';
import { doClick, buyUpgrade } from './controller';

export function updateView(): void {
    var smiley: string = model.smileyIndex == 0 ? '😀' : '😁';

    const app: HTMLElement = document.getElementById('app')!; // sideffekt!
    app.replaceChildren();
    const image: HTMLElement = document.createElement('div');
    const pointsInfo: HTMLElement = document.createElement('div');
    const upgrade: HTMLElement = document.createElement('button');
    image.textContent = smiley;
    pointsInfo.textContent = '' + model.points;
    upgrade.textContent = 'Kjøp oppgradering (10 poeng)';
    app.append(image, pointsInfo, upgrade);

    image.addEventListener('click', doClick);
    upgrade.addEventListener('click', buyUpgrade);
}

