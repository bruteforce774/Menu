import { model } from './model.js';
import { updateView } from './view.js';

function doClick() {
    model.points += model.pointsPerClick;
    model.smileyIndex = 1 - model.smileyIndex;
    updateView();
}

function buyUpgrade() {
    if (model.points < 10) return;
    model.points -= 10;
    model.pointsPerClick++;
    updateView();
}

export { doClick, buyUpgrade };