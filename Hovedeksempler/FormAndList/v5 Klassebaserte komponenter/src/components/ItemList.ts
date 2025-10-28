import type { Item } from '../types';

export class ItemList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['items'];
    }

    get items(): Item[] {
        if (!this.hasAttribute('items')) {
            return [];
        }

        const json = this.getAttribute('items')!;
        return JSON.parse(json) as Item[];
    }

    set items(value: Item[]) {
        this.setAttribute('items', JSON.stringify(value));
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot!.innerHTML = /*HTML*/`
            <ul>
                ${this.items.map(item => /*HTML*/`
                    <li>${item.count} - ${item.description}</li>
                `).join('')}
            </ul>
        `;
    }
}

// export function ItemList(state: AppState): HTMLElement {
//     const element = document.createElement('div');
//     element.innerHTML = /*HTML*/`
//         <ul>
//             ${state.items.map(item => /*HTML*/`
//                 <li>${item.count} - ${item.description}</li>
//             `).join('')}
//         </ul>
//     `;
//     return element;
// }