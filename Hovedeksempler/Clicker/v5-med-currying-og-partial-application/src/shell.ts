import { doClick, buyUpgrade, buySuperUpgrade, makeUpgradeDowngrade } from './controller';
import { MainView } from './views/main';
import { applyDiff } from './applyDiff';
import type { Model } from './types';

// ACTION: This is the main action orchestrator - it has multiple side effects:
// 1. DOM manipulation (document.getElementById, replaceChildren)
// 2. Recursion that depends on user events
// 3. Uses Math.random (non-deterministic)
function render(model: Model, action: string | null): void {
    // CALCULATION: These are pure calculations transforming the model
    if (action === 'click') model = doClick(model);
    else if (action === 'buyUpgrade') model = buyUpgrade(model);
    else if (action === 'buySuperUpgrade') model = buySuperUpgrade(model);
    else if (action === 'upgradeDowngrade') model = makeUpgradeDowngrade(Math.random)(model); // ACTION: Math.random is non-deterministic
    
    // ACTION: Creates event handler that will recursively call render
    const handleEvent = (action: string) => render(model, action);
    
    // CALCULATION: MainView creates virtual DOM but doesn't mutate anything yet
    const element = MainView(model, handleEvent);
    
    // ACTION: DOM queries and mutations (side effects)
    const app = document.getElementById('app')!;
    // const oldElement = app.children[0] as HTMLElement;
    // ta inn denne linjen og kommenter ut den neste for å bruke diffing
    //applyDiff(app, oldElement, element); // ACTION: DOM mutation
    app.replaceChildren(element); // ACTION: DOM mutation
}

export { render };