import { expect, test } from 'vitest';
import { sum } from './dummy'

test('adds 1 + 2 to equal 3', () => {
    // Arrange
    const a = 1;
    const b = 2;

    // Act 
    const actualTotal = sum(a, b);

    // Assert
    const expectedTotal = 3;
    expect(actualTotal).toBe(expectedTotal);
})