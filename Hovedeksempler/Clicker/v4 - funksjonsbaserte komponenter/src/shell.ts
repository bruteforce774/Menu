import { doClick, buyUpgrade } from './controller';
import { MainView } from './views/main';
import { applyDiff } from './applyDiff';
import type { Model } from './types';

function render(model: Model, action: string | null): void {
    if (action === 'click') model = doClick(model);
    else if (action === 'buyUpgrade') model = buyUpgrade(model);

    const handleEvent = (action: string) => render(model, action);
    const element = MainView(model, handleEvent);
    const app = document.getElementById('app')!;
    const oldElement = app.children[0] as HTMLElement;
    // ta inn denne linjen og kommenter ut den neste for å bruke diffing
    // applyDiff(app, oldElement, element);
    app.replaceChildren(element);
}

export { render };