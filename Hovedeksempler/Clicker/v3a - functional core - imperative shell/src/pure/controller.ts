import type { Model } from '../types';

function doClick(model: Model): Model {
    // Imperativ versjon:
    // model.points += model.pointsPerClick;
    // model.smileyIndex = 1 - model.smileyIndex;

    // Funksjonell versjon 1
    // return Object.freeze({
    //     points: model.points + model.pointsPerClick,
    //     smileyIndex: 1 - model.smileyIndex,
    //     pointsPerClick: model.pointsPerClick,
    // });

    // Funksjonell versjon 2
    return Object.freeze({
        ...model,
        points: model.points + model.pointsPerClick,
        smileyIndex: 1 - model.smileyIndex,
    });
}

function buyUpgrade(model: Model): Model {
    // Imperativ versjon:
    // if (model.points < 10) return;
    // model.points -= 10;
    // model.pointsPerClick++;

    // Funksjonell versjon 
    if (model.points < 10) return model;

    return Object.freeze({
        ...model,
        points: model.points - 10,
        pointsPerClick: model.pointsPerClick + 1
    });
}

export { doClick, buyUpgrade };