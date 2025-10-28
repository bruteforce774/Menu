import { expect, test, vi } from 'vitest';
import { NewTaskForm } from './NewTaskForm';

test('emit click', () => {
    // Arrange
    const handleEvent = vi.fn();
    
    // Act 
    const element = NewTaskForm(handleEvent);
    const userInput = element.querySelector('input')!;
    userInput.value = 'Ny oppgave';
    userInput.dispatchEvent(new Event('input'));    
    element.querySelector('button')!.click();

    // Assert
    expect(handleEvent).toHaveBeenCalledWith('addTask', 'Ny oppgave');
});