import type { Model } from './types';

// DATA: Initial immutable state - just a frozen object with values
export const model : Model = Object.freeze({
    points: 0,
    pointsPerClick: 1,
    smileyIndex: 0,
    autoClickers: false
});

