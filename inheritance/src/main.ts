/**
 * Main entry point - Register all custom elements
 *
 * This file demonstrates:
 * 1. How to import components
 * 2. How to register them with customElements.define()
 * 3. How to use them in HTML
 */

import { SimpleView } from './views/SimpleView';
import { CounterView } from './views/CounterView';
import { InputView } from './views/InputView';
import { ParentView } from './views/ParentView';
import { FormInputView } from './views/FormInputView';
import { FormContainerView } from './views/FormContainerView';

// Register all custom elements
customElements.define('simple-view', SimpleView);
customElements.define('counter-view', CounterView);
customElements.define('input-view', InputView);
customElements.define('parent-view', ParentView);
customElements.define('form-input-view', FormInputView);
customElements.define('form-container-view', FormContainerView);

// Mount components to the app
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f5f5f5;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .section {
      margin: 30px 0;
    }
    .section-title {
      font-size: 20px;
      font-weight: bold;
      color: #555;
      margin: 20px 10px 10px 10px;
    }
    .note {
      background: #fff3cd;
      padding: 15px;
      border-left: 4px solid #ffc107;
      margin: 20px 10px;
      border-radius: 4px;
    }
    .note strong {
      color: #856404;
    }
  </style>

  <h1>BaseComponent Inheritance Examples</h1>

  <div class="section">
    <div class="section-title">Example 1: Simple View (attributes only)</div>
    <simple-view
      title="Welcome to Frameworkless Development"
      subtitle="Building web apps with just Web Components"
    ></simple-view>
  </div>

  <div class="section">
    <div class="section-title">Example 2: Counter View (internal state + events)</div>
    <counter-view
      label="Click Counter"
      initial-count="10"
    ></counter-view>
  </div>

  <div class="section">
    <div class="section-title">Example 3: Form Input with Local State (Teacher's Pattern)</div>
    <div class="note">
      <strong>Key Pattern:</strong> Input values are stored in instance properties, not DOM.
      This prevents focus loss when the component re-renders.
    </div>
    <form-container-view></form-container-view>
  </div>

  <div class="section">
    <div class="section-title">Example 4: Parent-Child Event Communication</div>
    <div class="note">
      <strong>Key Pattern:</strong> Children dispatch CustomEvents that bubble up to parents.
      Parent listens and updates its own state.
    </div>
    <parent-view></parent-view>
  </div>
`;

console.log('🎉 All components registered and mounted!');
console.log('Open DevTools to inspect the Shadow DOM of each component');
