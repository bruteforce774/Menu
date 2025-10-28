import type { Model } from '../types';

function updateView(model: Model): HTMLElement {
    const mainElement = document.createElement('div');
    for (let task of model.tasks) {
        const taskElement = document.createElement('li');
        taskElement.textContent = task.description;
        if (task.isFinished) {
            taskElement.style.textDecoration = 'line-through';
        }
        const button = document.createElement('button');
        button.textContent = '×';
        taskElement.append(button);
        mainElement.append(taskElement);
    }
    return mainElement;
}

export { updateView };