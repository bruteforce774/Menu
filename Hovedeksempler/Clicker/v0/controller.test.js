import { expect, test } from 'vitest';

function doClick() {
    points += pointsPerClick;
    smileyIndex = 1 - smileyIndex;
    updateView();
}

function buyUpgrade() {
    if (points < 10) return;
    points -= 10;
    pointsPerClick++;
    updateView();
}

function updateView() {
    // This function would normally update the UI, but is left empty for testing purposes.
}

// model
let points;
let pointsPerClick;
let smileyIndex;

test('doClick - 1 pointsPerClick', () => {
    // Arrange
    points = 0;
    pointsPerClick = 1;
    smileyIndex = 0;

    // Act 
    doClick();

    // Assert
    expect(points).toBe(1);
    expect(pointsPerClick).toBe(1);
    expect(smileyIndex).toBe(1);
});
