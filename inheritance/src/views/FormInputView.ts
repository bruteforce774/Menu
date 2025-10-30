import { BaseComponent } from '../components/BaseComponent';

/**
 * Example 3: Proper form input handling (Teacher's pattern)
 *
 * Key concepts:
 * - Stores input value in INSTANCE PROPERTY, not DOM
 * - Avoids re-rendering on every keystroke
 * - Only dispatches event when user explicitly submits
 * - This prevents the "focus loss" problem
 *
 * Pattern from: FormAndList v5, FilesAndFolders v5
 */
export class FormInputView extends BaseComponent {
  static props = ['label'];

  // LOCAL STATE - stores the current input value
  // This persists even if render() is called multiple times
  private currentValue: string = '';

  get label(): string {
    return this.get('label') || 'Input';
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
          gap: 10px;
          align-items: center;
        }
        label {
          font-weight: bold;
          color: #333;
          min-width: 100px;
        }
        input {
          flex: 1;
          padding: 8px;
          font-size: 16px;
          border: 2px solid #ddd;
          border-radius: 4px;
        }
        input:focus {
          outline: none;
          border-color: #FF9800;
        }
        button {
          padding: 8px 16px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background: #45a049;
        }
      </style>
      <div class="field">
        <label>${this.label}:</label>
        <input
          type="text"
          value="${this.currentValue}"
          placeholder="Type here..."
          id="input"
        />
        <button id="submit">Submit</button>
      </div>
    `;

    // Store value in instance property on every keystroke
    const input = this.shadowRoot!.querySelector<HTMLInputElement>('#input')!;
    input.addEventListener('input', () => {
      // CRITICAL: Store in instance property, NOT in DOM
      this.currentValue = input.value;
    });

    // Only dispatch event when user clicks submit
    const button = this.shadowRoot!.querySelector('#submit')!;
    button.addEventListener('click', this.handleSubmit.bind(this));
  }

  private handleSubmit() {
    // Use the stored value from instance property (teacher's pattern: inline detail)
    this.dispatchEvent(new CustomEvent('value-submitted', {
      bubbles: true,
      composed: true,
      detail: {
        label: this.label,
        value: this.currentValue
      }
    }));

    console.log(`${this.label} submitted: ${this.currentValue}`);
  }
}
