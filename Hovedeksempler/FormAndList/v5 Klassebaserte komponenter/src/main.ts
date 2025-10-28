import { AddNewForm } from "./components/AddNewForm";
import { ItemList } from "./components/ItemList";
import type { AppState, Item } from "./types";

// state.ts
const initialState: AppState = Object.freeze({
  items: []
});

customElements.define('my-list', ItemList);
customElements.define('add-new-form', AddNewForm);

render(initialState);

function render(state: AppState) {
  const app = document.querySelector<HTMLDivElement>('#app')!

  const addNewForm = document.createElement('add-new-form') as AddNewForm;
  app.replaceChildren(addNewForm);
  addNewForm.addEventListener('new-item-added', (e: Event) => {
    const customEvent = e as CustomEvent;
    state = structuredClone(state);
    state.items.push(customEvent.detail as Item);
    state = Object.freeze(state);
    render(state);
  });

  if (state.items.length == 0) {
    const emptyItemList = document.createElement('div');
    emptyItemList.textContent = '<Tom liste>';
    app.append(emptyItemList);
  } else {
    const itemList = document.createElement('my-list') as ItemList;
    // <my-list items="..."></my-list>
    app.append(itemList);
    itemList.items = state.items;
  }
}


