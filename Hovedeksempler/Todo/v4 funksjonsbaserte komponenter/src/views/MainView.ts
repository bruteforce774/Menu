import type { AppState, DispatchFunction } from '../types';
import { TodoList } from '../components/TodoList';
import { NewTaskForm } from '../components/NewTaskForm';

function MainView(state: AppState, dispatch: DispatchFunction): HTMLElement {
    const mainElement = document.createElement('div');
    mainElement.append(
        TodoList(state.tasks, dispatch),  
        NewTaskForm(dispatch)
    );
    return mainElement;
}

export { MainView };

