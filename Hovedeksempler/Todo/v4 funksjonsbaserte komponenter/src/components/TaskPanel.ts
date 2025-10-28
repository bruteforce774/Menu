import type { Task, DispatchFunction } from "../types";

export function TaskPanel(task: Task, index: number, dispatch: DispatchFunction): HTMLElement {
    const taskElement = document.createElement('div');
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

    deleteTaskButton.addEventListener('click', () => dispatch('deleteTask', index));
    toggleTaskDoneButton.addEventListener('click', () => dispatch('toggleTaskDone', index));

    return taskElement;
}
