import type { Item } from '../types';

export class AddNewForm extends HTMLElement {
    private readonly newObj: Item;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.newObj = {
            count: 0,
            description: ''
        };
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot!.innerHTML = /*HTML*/`
            <label>Antall</label><br/>
            <input type="number"/><br/>
            <label>Vare</label><br/>
            <input type="text"/><br/>
            <button>Legg til</button>
            <button>Nullstill</button>
        `;

        const countInput = this.shadowRoot!.querySelector<HTMLInputElement>('input[type="number"]')!;
        const itemInput = this.shadowRoot!.querySelector<HTMLInputElement>('input[type="text"]')!;
        countInput.addEventListener('input', () => this.newObj.count = countInput.valueAsNumber);
        itemInput.addEventListener('input', () => this.newObj.description = itemInput.value);
        const addButton = this.shadowRoot!.querySelector('button')!;
        addButton.addEventListener('click', this.dispatchNewItemAdd.bind(this));
        const resetButton = this.shadowRoot!.querySelector('button ~ button')!;
        resetButton.addEventListener('click', () => {
            this.newObj.count = 0;
            this.newObj.description = '';
            this.render();
        });
    }

    dispatchNewItemAdd() {
        const event = new CustomEvent('new-item-added', { detail: this.newObj });
        this.dispatchEvent(event);
    }
}

// export function AddNewForm(dispatch: Function): HTMLElement {
//     const element = document.createElement('div');
//     const newObj : Item = {
//         count: 0,
//         description: ''
//     }
//     element.innerHTML = /*HTML*/`
//         <label>Antall</label><br/>
//         <input type="number"/><br/>
//         <label>Vare</label><br/>
//         <input type="text"/><br/>
//         <button>Legg til</button>
//     `;
//     const countInput = element.querySelector<HTMLInputElement>('input[type="number"]')!;
//     const itemInput = element.querySelector<HTMLInputElement>('input[type="text"]')!;
//     countInput.addEventListener('input', () => newObj.count = countInput.valueAsNumber);
//     itemInput.addEventListener('input', () => newObj.description = itemInput.value);
//     const button = element.querySelector('button')!;
//     button.addEventListener('click', () => dispatch('add-new', newObj));
//     return element;
// }