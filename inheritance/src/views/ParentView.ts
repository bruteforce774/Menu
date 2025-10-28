import { BaseComponent } from '../components/BaseComponent';
import type { CounterIncrementedEvent } from '../types';

/**
 * Example 4: Simple parent-child communication (buttons, not forms)
 *
 * Key concepts:
 * - Parent listens for events from multiple children
 * - Children are simple buttons (no input fields)
 * - Demonstrates CustomEvent communication without form complexity
 * - No focus loss problem because there are no input fields!
 *
 * Note: For form inputs, see FormContainerView which handles the focus problem properly
 */
export class ParentView extends BaseComponent {
  static props = [];

  private messages: string[] = [];

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 20px;
          border: 3px solid #9C27B0;
          border-radius: 8px;
          margin: 10px;
        }
        h2 {
          color: #9C27B0;
          margin-top: 0;
        }
        .buttons {
          display: flex;
          gap: 10px;
          margin: 15px 0;
        }
        .messages {
          margin-top: 20px;
          padding: 15px;
          background: #F3E5F5;
          border-radius: 4px;
          min-height: 100px;
        }
        .messages h3 {
          margin-top: 0;
          color: #9C27B0;
        }
        .message {
          padding: 8px;
          margin: 5px 0;
          background: white;
          border-left: 3px solid #9C27B0;
          border-radius: 2px;
        }
        .empty {
          color: #999;
          font-style: italic;
        }
      </style>
      <h2>Parent Listening to Multiple Children</h2>
      <p>Click the + buttons below. Parent receives events and displays messages.</p>

      <div class="buttons">
        <counter-view label="Button A" initial-count="0"></counter-view>
        <counter-view label="Button B" initial-count="10"></counter-view>
        <counter-view label="Button C" initial-count="100"></counter-view>
      </div>

      <div class="messages">
        <h3>Events Received:</h3>
        ${this.messages.length > 0 ?
          this.messages.map(msg => `<div class="message">${msg}</div>`).join('') :
          '<p class="empty">No events received yet. Click the buttons above!</p>'
        }
      </div>
    `;

    // Listen for events from child counter components (teacher's pattern)
    this.shadowRoot!.querySelectorAll('counter-view')
      .forEach(counter => {
        counter.addEventListener('counter-incremented', this.handleCounterEvent.bind(this));
      });
  }

  private handleCounterEvent(event: Event) {
    const customEvent = event as CounterIncrementedEvent;
    const { label, count } = customEvent.detail;

    const message = `${label} was incremented to ${count}`;
    console.log(`Parent received: ${message}`);

    this.messages.unshift(message);

    // Keep only last 5 messages
    if (this.messages.length > 5) {
      this.messages.pop();
    }

    this.render();
  }
}
