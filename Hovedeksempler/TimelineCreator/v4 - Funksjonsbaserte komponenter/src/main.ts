import * as Edit from './editController';
import * as Main from './mainController';
import { EditView } from './views/editView';
import { MainView } from './views/mainView';
import type { DispatchFunction, Model } from './types';

function render(model: Model, action: any, value: any): void {
    if (action === 'saveTimeline') model = Edit.saveTimeline(model, value);
    if (action === 'discardChanges') model = Edit.discardChanges(model);
    if (action === 'previewTimeline') model = Main.previewTimeline(model, value);
    if (action === 'goToEditTimeline') model = Main.goToEditTimeline(model, value);
    if (action === 'deleteTimeline') model = Main.deleteTimeline(model, value);
    if (action === 'exportTimeline') {
        Main.exportTimeline(model, value);
        return; // ingen re-render
    }

    const dispatch: DispatchFunction = (action, value) => render(model, action, value);
    const page = model.app.currentPage;
    let element = page === 'edit' ? EditView(model, dispatch) :  MainView(model, dispatch);
    const app = document.getElementById('app')!;
    app.replaceChildren(element);
}

export { render };