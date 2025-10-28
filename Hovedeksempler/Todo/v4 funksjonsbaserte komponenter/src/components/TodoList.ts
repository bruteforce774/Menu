import type { Task, DispatchFunction } from '../types';
import { TaskPanel } from './TaskPanel';

export function TodoList(tasks: Task[], dispatch: DispatchFunction): HTMLElement {
    const mainElement = document.createElement('ul');    
    for (let index = 0; index < tasks.length; index++) {
        const taskElement = TaskPanel(tasks[index], index, dispatch);
        const li = document.createElement('li');
        li.append(taskElement);
        mainElement.append(li);
    }
    return mainElement;
}