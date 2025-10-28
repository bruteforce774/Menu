import { BaseComponent } from "../components/BaseComponent";

export class NumberSelector extends BaseComponent {
    private state = {
        number: 1,
    };
    props = ['value', 'min', 'max'];

    connectedCallback(): void {
        const value = parseInt(this.get('value'));
        this.state.number = value;
        this.render();
    }

    render() {
        this.shadowRoot!.innerHTML = /*HTML*/`
            ${this.getStyle()}

            <div class="container">
                <div class="value">${this.state.number}</div>
                <div class="buttons">
                    <button>▲</button>
                    <button>▼</button>
                </div>
            </div>            
        `;
        const buttons = this.shadowRoot!.querySelectorAll('button');
        buttons[0].addEventListener('click', () => this.changeNumber(1));
        buttons[1].addEventListener('click', () => this.changeNumber(-1));
    }

    changeNumber(change: number) {
        const newNumber = this.state.number + change;
        const min = parseInt(this.get('min'));
        const max = parseInt(this.get('max'));
        if (newNumber >= min && newNumber <= max) {
            this.state.number = newNumber;
            this.dispatchEvent(new CustomEvent('number-changed', { detail: newNumber }));
        }
        this.render();
    }

    getStyle() {
        return /*HTML*/`
            <style>
                .container {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .value {
                    font-size: 300%;
                    user-select: none;
                }
                .buttons{
                    display: flex; 
                    flex-direction: column;
                    align-items: flex-start;                    
                }
            </style>
        `;
    }
}


