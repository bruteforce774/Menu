import { BaseComponent } from '../components/BaseComponent';

/**
 * Example 3: Form input with custom events (child-to-parent communication)
 *
 * Key concepts:
 * - Dispatches CustomEvent to notify parent of changes
 * - Uses bubbles: true and composed: true for event propagation
 * - Passes data through event.detail
 * - Demonstrates how child components communicate with parents
 */
export class InputView extends BaseComponent {
  static props = ['label', 'value', 'placeholder'];

  get label(): string {
    return this.get('label') || '';
  }

  get value(): string {
    return this.get('value') || '';
  }

  get placeholder(): string {
    return this.get('placeholder') || '';
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          margin: 10px 0;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        label {
          font-weight: bold;
          color: #333;
        }
        input {
          padding: 10px;
          font-size: 16px;
          border: 2px solid #ddd;
          border-radius: 4px;
          transition: border-color 0.3s;
        }
        input:focus {
          outline: none;
          border-color: #FF9800;
        }
      </style>
      <div class="field">
        <label>${this.label}</label>
        <input
          type="text"
          value="${this.value}"
          placeholder="${this.placeholder}"
          id="input"
        />
      </div>
    `;

    this.shadowRoot!.querySelector('#input')!
      .addEventListener('input', this.handleInput.bind(this));
  }

  private handleInput(event: Event) {
    const input = event.target as HTMLInputElement;

    // Dispatch custom event that parent can listen to (teacher's pattern: inline detail)
    this.dispatchEvent(new CustomEvent('value-changed', {
      bubbles: true,      // Event bubbles up through DOM
      composed: true,     // Event crosses shadow DOM boundary
      detail: {
        label: this.label,
        value: input.value,
        timestamp: new Date().toISOString()
      }
    }));
  }
}
