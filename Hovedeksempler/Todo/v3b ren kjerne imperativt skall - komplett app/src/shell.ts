import { updateView } from './pure/view';
import { deleteTask, toggleTaskDone, addTask } from './pure/controller';
import type { Model } from './types';

function render(model: Model, action: string | null, value: number): void {
    if (action == 'deleteTask') model = deleteTask(model, value);
    else if (action == 'toggleTaskDone') model = toggleTaskDone(model, value);
    else if( action == 'addTask') model = addTask(model, value);

    const app = document.getElementById("app")!;
    const handleEvent =
        (action: string | null, value: number) => render(model, action, value);
    const element = updateView(model, handleEvent);
    app.replaceChildren(element);
}

export { render };