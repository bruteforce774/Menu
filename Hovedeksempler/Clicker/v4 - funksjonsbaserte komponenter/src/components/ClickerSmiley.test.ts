import { expect, test, vi } from 'vitest';
import { ClickerSmiley } from './ClickerSmiley';

test('doClick - smileyIndex 0', () => {
    // Arrange
    const handleEvent = (eventType: string) => {
    };

    // Act 
    const element = ClickerSmiley(0, handleEvent);

    // Assert
    expect(element.textContent).toBe('😀');
});

test('doClick - smileyIndex 1', () => {
    // Arrange
    const handleEvent = vi.fn();

    // Act 
    const element = ClickerSmiley(1, handleEvent);
    
    // Assert
    expect(element.textContent).toBe('😁');
});

test('emit click', () => {
    // Arrange
    const handleEvent = vi.fn();
    
    // Act 
    const element = ClickerSmiley(1, handleEvent);
    element.click();

    // Assert
    expect(handleEvent).toHaveBeenCalledWith('click');
});