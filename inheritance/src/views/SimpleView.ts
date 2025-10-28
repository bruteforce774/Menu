import { BaseComponent } from '../components/BaseComponent';

/**
 * Example 1: Simplest possible view extending BaseComponent
 *
 * Key concepts:
 * - Extends BaseComponent (inherits all its functionality)
 * - Defines static props array (tells BaseComponent which attributes to observe)
 * - Uses get() method to retrieve attribute values
 * - Implements render() method to define the UI
 */
export class SimpleView extends BaseComponent {
  // Define which attributes this component observes
  static props = ['title', 'subtitle'];

  // Getter methods for type-safe attribute access
  get title(): string {
    return this.get('title') || 'Default Title';
  }

  get subtitle(): string {
    return this.get('subtitle') || '';
  }

  // Override render() from BaseComponent
  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 20px;
          border: 2px solid #4CAF50;
          border-radius: 8px;
          margin: 10px;
        }
        h1 {
          color: #4CAF50;
          margin: 0 0 10px 0;
        }
        p {
          color: #666;
          margin: 0;
        }
      </style>
      <h1>${this.title}</h1>
      ${this.subtitle ? `<p>${this.subtitle}</p>` : ''}
    `;
  }
}
