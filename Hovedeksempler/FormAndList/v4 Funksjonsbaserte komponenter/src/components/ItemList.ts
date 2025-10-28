import type { AppState } from '../types';

export function ItemList(state: AppState): HTMLElement {
    const element = document.createElement('div');
    element.innerHTML = /*HTML*/`
        <ul>
            ${state.items.map(item => /*HTML*/`
                <li>${item.count} - ${item.description}</li>
            `).join('')}
        </ul>
    `;
    return element;
}