import type { Model } from '../types';

function doClick(model: Model): Model {
    // Funksjonell versjon 2    
    return Object.freeze({
        ...model,
        points: model.points + model.pointsPerClick,
        smileyIndex: 1 - model.smileyIndex,
    });

    // Imperativ versjon:
    // model.points += model.pointsPerClick;
    // model.smileyIndex = 1 - model.smileyIndex;

    // Funksjonell versjon 1
    // return Object.freeze({
    //     points: model.points + model.pointsPerClick,
    //     smileyIndex: 1 - model.smileyIndex,
    //     pointsPerClick: model.pointsPerClick,
    // });
}

function buyUpgrade(model: Model): Model {
    // Funksjonell versjon 
    if (model.points < 10) return model;

    return Object.freeze({
        ...model,
        points: model.points - 10,
        pointsPerClick: model.pointsPerClick + 1
    });
    // Imperativ versjon:
    // if (model.points < 10) return;
    // model.points -= 10;
    // model.pointsPerClick++;
}

export { doClick, buyUpgrade };