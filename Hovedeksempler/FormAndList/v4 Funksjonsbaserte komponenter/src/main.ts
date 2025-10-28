import { AddNewForm } from "./components/AddNewForm";
import { ItemList } from "./components/ItemList";
import type { AppState, Item } from "./types";

// state.ts
const initialState: AppState = Object.freeze({
  items: []
});

render(initialState, '', null);
function render(state: AppState, action: string, value: any) {
  if (action === 'add-new') {
    // kan trekkes ut i controller.ts
    state = structuredClone(state);
    state.items.push(value as Item);
    state = Object.freeze(state);
  }
  const app = document.querySelector<HTMLDivElement>('#app')!
  const dispatch = (action: string, value: any) => render(state, action, value);
  const addNewForm = AddNewForm(dispatch);
  let itemList: HTMLElement;
  if (state.items.length == 0) {
    itemList = document.createElement('div');
    itemList.textContent = '<Tom liste>';
  } else {
    itemList = ItemList(state);
  }
  app.replaceChildren(addNewForm, itemList);
}


