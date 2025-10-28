import { expect, test } from 'vitest';
import { doClick, buyUpgrade } from './controller';
import type { Model } from './types';

test('doClick - 1 pointsPerClick', () => {
    // Arrange
    const model: Model = Object.freeze({
        points: 0,
        pointsPerClick: 1,
        smileyIndex: 0
    });

    // Act 
    const updatedModel = doClick(model);

    // Assert
    expect(updatedModel.points).toBe(1);
    expect(updatedModel.pointsPerClick).toBe(1);
    expect(updatedModel.smileyIndex).toBe(1);
});

test('doClick - 1 pointsPerClick', () => {
    // Arrange
    const model: Model = Object.freeze({
        points: 1000,
        pointsPerClick: 7,
        smileyIndex: 1,
    });

    // Act 
    const updatedModel = doClick(model);

    // Assert
    expect(updatedModel.points).toBe(1007);
    expect(updatedModel.pointsPerClick).toBe(7);
    expect(updatedModel.smileyIndex).toBe(0);
});