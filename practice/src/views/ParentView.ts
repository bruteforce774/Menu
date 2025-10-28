import { BaseComponent } from '../components/BaseComponent';

/**
 * Example 4: Parent component that listens to child events
 *
 * Key concepts:
 * - Parent manages state from multiple children
 * - Listens for custom events from child components
 * - Demonstrates data flow: Child → Event → Parent → State Update → Re-render
 * - Shows how to coordinate multiple components
 */
export class ParentView extends BaseComponent {
  static props = [];

  // Parent's state collected from children
  private formData = {
    firstName: '',
    lastName: '',
    email: ''
  };

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
        .preview {
          margin-top: 20px;
          padding: 15px;
          background: #F3E5F5;
          border-radius: 4px;
        }
        .preview h3 {
          margin-top: 0;
          color: #9C27B0;
        }
        .preview p {
          margin: 5px 0;
          color: #333;
        }
      </style>
      <h2>Parent Component (Form Container)</h2>

      <input-view
        label="First Name"
        value="${this.formData.firstName}"
        placeholder="Enter first name"
      ></input-view>

      <input-view
        label="Last Name"
        value="${this.formData.lastName}"
        placeholder="Enter last name"
      ></input-view>

      <input-view
        label="Email"
        value="${this.formData.email}"
        placeholder="Enter email"
      ></input-view>

      <div class="preview">
        <h3>Live Preview (Parent's State):</h3>
        <p><strong>Full Name:</strong> ${this.formData.firstName} ${this.formData.lastName}</p>
        <p><strong>Email:</strong> ${this.formData.email || '(not provided)'}</p>
      </div>
    `;

    // Listen for custom events from all child input-view components
    this.shadowRoot!.querySelectorAll('input-view')
      .forEach(input => {
        input.addEventListener('value-changed', this.handleValueChange.bind(this));
      });
  }

  private handleValueChange(event: Event) {
    const customEvent = event as CustomEvent;
    const { label, value } = customEvent.detail;

    console.log(`Parent received event: ${label} = ${value}`);

    // Update parent state based on which child sent the event
    if (label === 'First Name') {
      this.formData.firstName = value;
    } else if (label === 'Last Name') {
      this.formData.lastName = value;
    } else if (label === 'Email') {
      this.formData.email = value;
    }

    // Re-render to show updated state
    this.render();
  }
}
