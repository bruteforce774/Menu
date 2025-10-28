import type { Item } from '../types';

export function AddNewForm(dispatch: Function): HTMLElement {
    const element = document.createElement('div');
    const newObj : Item = {
        count: 0, 
        description: ''
    }
    element.innerHTML = /*HTML*/`
        <label>Antall</label><br/>
        <input type="number"/><br/>
        <label>Vare</label><br/>
        <input type="text"/><br/>
        <button>Legg til</button>
    `;
    const countInput = element.querySelector<HTMLInputElement>('input[type="number"]')!;
    const itemInput = element.querySelector<HTMLInputElement>('input[type="text"]')!;
    countInput.addEventListener('input', () => newObj.count = countInput.valueAsNumber);
    itemInput.addEventListener('input', () => newObj.description = itemInput.value);
    const button = element.querySelector('button')!;
    button.addEventListener('click', () => dispatch('add-new', newObj));
    return element;
}