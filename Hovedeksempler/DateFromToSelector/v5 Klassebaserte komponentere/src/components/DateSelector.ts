import { BaseComponent } from "../components/BaseComponent";

export class DateSelector extends BaseComponent {
    private state = {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    }
    render() {
        this.shadowRoot!.innerHTML = /*HTML*/`
            <style>
                div {
                    display: flex;
                    gap: 6px;
                }
            </style>
            <div>
                <number-selector value="${this.state.day}" min="1" max="31"></number-selector>
                <number-selector value="${this.state.month}" min="1" max="12"></number-selector>
                <number-selector value="${this.state.year}" min="2025" max="2026"></number-selector>
            </div>
        `;
        const numberSelectors = this.shadowRoot!.querySelectorAll('number-selector');
        numberSelectors[0].addEventListener('number-changed', (e: Event) => this.validateDate(e, 'day'));
        numberSelectors[1].addEventListener('number-changed', (e: Event) => this.validateDate(e, 'month'));
        numberSelectors[2].addEventListener('number-changed', (e: Event) => this.validateDate(e, 'year'));
    }

    validateDate(e: Event, fieldName: string) {

    }
}