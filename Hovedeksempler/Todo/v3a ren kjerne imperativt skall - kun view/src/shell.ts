import { updateView } from './pure/view';
import { model } from './model';

function render() {
    const app = document.getElementById("app")!;
    const element = updateView(model);
    app.replaceChildren(element);
}

export { render };