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

// Register all custom elements
customElements.define('simple-view', SimpleView);
customElements.define('counter-view', CounterView);
customElements.define('input-view', InputView);
customElements.define('parent-view', ParentView);

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
    <div class="section-title">Example 3 & 4: Parent-Child Communication (custom events)</div>
    <parent-view></parent-view>
  </div>
`;

console.log('🎉 All components registered and mounted!');
console.log('Open DevTools to inspect the Shadow DOM of each component');
