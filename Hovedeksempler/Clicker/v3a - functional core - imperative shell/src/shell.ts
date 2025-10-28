import { model } from './model';
import { doClick, buyUpgrade } from './pure/controller';
import { updateView } from './pure/view';

let appModel = model;

function render(action: string | null): void {
    if (action === 'click') appModel = doClick(appModel);
    else if (action === 'buyUpgrade') appModel = buyUpgrade(appModel);

    const element = updateView(appModel, render);
    const app = document.getElementById('app')!;
    app.replaceChildren(element)
}

export { render };