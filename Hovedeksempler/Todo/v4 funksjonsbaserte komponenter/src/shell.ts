import { MainView } from './views/MainView';
import { deleteTask, toggleTaskDone, addTask } from './controller';
import type { AppState, DispatchFunction } from './types';

function render(state: AppState, action: string | null, value: any): void {
    if (action == 'deleteTask') state = deleteTask(state, value);
    else if (action == 'toggleTaskDone') state = toggleTaskDone(state, value);
    else if (action == 'addTask') state = addTask(state, value);

    const app = document.getElementById("app")!;
    const dispatch: DispatchFunction = (action, value) => render(state, action, value);
    const element = MainView(state, dispatch);
    app.replaceChildren(element);
}

export { render };