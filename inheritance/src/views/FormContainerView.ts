import { BaseComponent } from '../components/BaseComponent';

/**
 * Example 4: Form container with proper state management
 *
 * Key concepts:
 * - Parent stores form data
 * - Children notify parent only when user explicitly submits
 * - No re-rendering on every keystroke = no focus loss
 * - Demonstrates the teacher's pattern for handling forms
 *
 * Pattern from: FormAndList v5b
 */
export class FormContainerView extends BaseComponent {
  static props = [];

  // Parent's state - only updated when children submit
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
          border: 3px solid #2196F3;
          border-radius: 8px;
          margin: 10px;
        }
        h2 {
          color: #2196F3;
          margin-top: 0;
        }
        .form-section {
          margin-bottom: 20px;
        }
        .result {
          margin-top: 20px;
          padding: 15px;
          background: #E3F2FD;
          border-radius: 4px;
          min-height: 80px;
        }
        .result h3 {
          margin-top: 0;
          color: #2196F3;
        }
        .result p {
          margin: 5px 0;
          color: #333;
        }
        .result .empty {
          color: #999;
          font-style: italic;
        }
      </style>
      <h2>Form Container (Proper Pattern)</h2>

      <div class="form-section">
        <p><strong>Instructions:</strong> Type in the fields and click Submit for each one.</p>
        <form-input-view label="First Name"></form-input-view>
        <form-input-view label="Last Name"></form-input-view>
        <form-input-view label="Email"></form-input-view>
      </div>

      <div class="result">
        <h3>Submitted Data:</h3>
        ${this.hasData() ? `
          <p><strong>Full Name:</strong> ${this.formData.firstName} ${this.formData.lastName}</p>
          <p><strong>Email:</strong> ${this.formData.email}</p>
        ` : `
          <p class="empty">No data submitted yet. Fill in the fields and click Submit!</p>
        `}
      </div>
    `;

    // Listen for value-submitted events from child components
    this.shadowRoot!.querySelectorAll('form-input-view')
      .forEach(input => {
        input.addEventListener('value-submitted', this.handleValueSubmitted.bind(this));
      });
  }

  private hasData(): boolean {
    return this.formData.firstName !== '' ||
           this.formData.lastName !== '' ||
           this.formData.email !== '';
  }

  private handleValueSubmitted(event: Event) {
    const customEvent = event as CustomEvent;
    const { label, value } = customEvent.detail;

    console.log(`Container received: ${label} = ${value}`);

    // Update state based on which field was submitted
    if (label === 'First Name') {
      this.formData.firstName = value;
    } else if (label === 'Last Name') {
      this.formData.lastName = value;
    } else if (label === 'Email') {
      this.formData.email = value;
    }

    // Re-render to show the updated data
    // This is safe because the inputs DON'T get recreated
    // (they store their own values internally)
    this.render();
  }
}
