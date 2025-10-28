import { BaseComponent } from '../components/BaseComponent';

/**
 * Example 2: Interactive view with internal state
 *
 * Key concepts:
 * - Component can have private state (not just attributes)
 * - Event handlers can modify state and trigger re-render
 * - Uses bind(this) to preserve context in event handlers
 * - Demonstrates lifecycle: render → attach listeners → user interaction → re-render
 */
export class CounterView extends BaseComponent {
  static props = ['initial-count', 'label'];

  // Private internal state (not an attribute)
  private count: number = 0;

  get initialCount(): number {
    return this.get('initial-count') || 0;
  }

  get label(): string {
    return this.get('label') || 'Counter';
  }

  // connectedCallback runs when component is added to DOM
  connectedCallback() {
    // Initialize count from attribute
    this.count = this.initialCount;
    // Call parent's connectedCallback (important!)
    super.connectedCallback();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 20px;
          border: 2px solid #2196F3;
          border-radius: 8px;
          margin: 10px;
          text-align: center;
        }
        h2 {
          color: #2196F3;
          margin: 0 0 15px 0;
        }
        .count-display {
          font-size: 48px;
          font-weight: bold;
          color: #2196F3;
          margin: 20px 0;
        }
        .buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          background: #2196F3;
          color: white;
          transition: background 0.3s;
        }
        button:hover {
          background: #1976D2;
        }
        button.reset {
          background: #f44336;
        }
        button.reset:hover {
          background: #d32f2f;
        }
      </style>
      <h2>${this.label}</h2>
      <div class="count-display">${this.count}</div>
      <div class="buttons">
        <button id="decrement">-</button>
        <button id="reset" class="reset">Reset</button>
        <button id="increment">+</button>
      </div>
    `;

    // Attach event listeners after rendering
    this.shadowRoot!.querySelector('#increment')!
      .addEventListener('click', this.handleIncrement.bind(this));

    this.shadowRoot!.querySelector('#decrement')!
      .addEventListener('click', this.handleDecrement.bind(this));

    this.shadowRoot!.querySelector('#reset')!
      .addEventListener('click', this.handleReset.bind(this));
  }

  private handleIncrement() {
    this.count++;
    this.render();  // Manually trigger re-render

    // Dispatch custom event for parent to listen to
    this.dispatchEvent(new CustomEvent('counter-incremented', {
      bubbles: true,
      composed: true,
      detail: {
        label: this.label,
        count: this.count
      }
    }));
  }

  private handleDecrement() {
    this.count--;
    this.render();
  }

  private handleReset() {
    this.count = this.initialCount;
    this.render();
  }
}
