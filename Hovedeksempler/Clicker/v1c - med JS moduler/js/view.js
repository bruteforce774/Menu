import { model } from './model.js';
import { doClick, buyUpgrade } from './controller.js';

export function updateView() {
    var smiley = model.smileyIndex == 0 ? '😀' : '😁';
    // document.getElementById('app').innerHTML = /*HTML*/`
    //     <div id="image">${smiley}</div>
    //     <div id="pointsInfo">${model.points}</div>
    //     <button id="upgrade">Kjøp oppgradering (10 poeng)</button>
    // `;

    const app = document.getElementById('app');
    app.replaceChildren();
    const image = document.createElement('div');
    const pointsInfo = document.createElement('div');
    const upgrade = document.createElement('button');
    image.textContent = smiley;
    pointsInfo.textContent = model.points;
    upgrade.textContent = 'Kjøp oppgradering (10 poeng)';
    app.append(image, pointsInfo, upgrade);

    // const image = document.getElementById('image');
    // const upgrade = document.getElementById('upgrade');
    image.addEventListener('click', doClick);
    upgrade.addEventListener('click', buyUpgrade);
}

