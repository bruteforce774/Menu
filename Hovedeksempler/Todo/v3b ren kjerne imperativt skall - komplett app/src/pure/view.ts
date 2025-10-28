import type { Model } from '../types';

function updateView(model: Model, handleEvent: Function): HTMLElement {
    const mainElement = document.createElement('div');
    console.log(model);
    for (let index = 0; index < model.tasks.length; index++) {
        createTaskAndAppendElement(model, index, mainElement, handleEvent);
    }

    const newTaskInput = document.createElement('input');
    newTaskInput.id = 'newTaskInput';
    newTaskInput.type = 'text';
    newTaskInput.placeholder = 'Ny oppgave';
    if (model.input?.description) newTaskInput.value = model.input.description;
    mainElement.append(newTaskInput);

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = '+';
    mainElement.append(addTaskButton);
    addTaskButton.addEventListener('click', () => {
        const inputElement = document.getElementById('newTaskInput') as HTMLInputElement;
        const description = inputElement.value;
        handleEvent('addTask', description);
    });

    return mainElement;
}

export { updateView };

function createTaskAndAppendElement(model: Model, index: number, mainElement: HTMLDivElement, handleEvent: Function) {
    const task = model.tasks[index];
    const taskElement = document.createElement('li');
    taskElement.textContent = task.description;
    if (task.isFinished) {
        taskElement.style.textDecoration = 'line-through';
    }
    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.textContent = '×';
    taskElement.append(deleteTaskButton);

    const toggleTaskDoneButton = document.createElement('button');
    toggleTaskDoneButton.textContent = task.isFinished ? '↺' : '✓';
    taskElement.append(toggleTaskDoneButton);

    mainElement.append(taskElement);
    deleteTaskButton.addEventListener('click', () => handleEvent('deleteTask', index));
    toggleTaskDoneButton.addEventListener('click', () => handleEvent('toggleTaskDone', index));
}
