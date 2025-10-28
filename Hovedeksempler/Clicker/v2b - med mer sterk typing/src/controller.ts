import { model } from './model';
import { updateView } from './view';

function doClick(): void {
    model.points += model.pointsPerClick; // mutasjon!
    model.smileyIndex = 1 - model.smileyIndex; // mutasjon!
    updateView();
}

function buyUpgrade(): void {
    if (model.points < 10) return;
    model.points -= 10; // mutasjon!
    model.pointsPerClick++; // mutasjon!
    updateView();
}

export { doClick, buyUpgrade };