import { doClick, buyUpgrade } from './pure/controller';
import { updateView } from './pure/view';
import type { Model } from './types';

function render(model: Model, action: string | null): void {
    if (action === 'click') model = doClick(model);
    else if (action === 'buyUpgrade') model = buyUpgrade(model);

    const handleEvent = (action: string) => render(model, action);
    const element = updateView(model, handleEvent);
    const app = document.getElementById('app')!;
    app.replaceChildren(element);
}

export { render };