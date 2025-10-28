# BaseComponent Inheritance Practice

This project demonstrates how to use inheritance with the `BaseComponent` class to build frameworkless web applications.

## Project Structure

```
inheritance/
├── src/
│   ├── components/
│   │   └── BaseComponent.ts    # Base class (from teacher's code)
│   ├── views/
│   │   ├── SimpleView.ts       # Example 1: Basic attributes
│   │   ├── CounterView.ts      # Example 2: Internal state
│   │   ├── InputView.ts        # Example 3: Custom events
│   │   └── ParentView.ts       # Example 4: Parent-child communication
│   └── main.ts                 # Entry point
├── index.html
├── package.json
└── tsconfig.json
```

## Setup

```bash
cd inheritance
npm install
npm run dev
```

## Key Concepts Demonstrated

### 1. **BaseComponent Features**

The `BaseComponent` class provides:
- Automatic Shadow DOM creation
- Attribute observation via `static props`
- Helper methods: `get()` and `set()` with JSON parsing
- Render scheduling using `requestAnimationFrame`
- Lifecycle management

### 2. **Inheritance Pattern**

```typescript
export class MyView extends BaseComponent {
  // Define observed attributes
  static props = ['my-attribute'];

  // Getter for type-safe access
  get myAttribute(): string {
    return this.get('my-attribute') || 'default';
  }

  // Override render() to define UI
  render() {
    this.shadowRoot!.innerHTML = `
      <style>/* CSS */</style>
      <div>${this.myAttribute}</div>
    `;
  }
}
```

### 3. **Component Communication**

**Parent → Child**: Via attributes
```typescript
// Parent sets attributes
<child-component attribute="value"></child-component>

// Child reads attributes
get attribute(): string {
  return this.get('attribute');
}
```

**Child → Parent**: Via custom events
```typescript
// Child dispatches event
this.dispatchEvent(new CustomEvent('my-event', {
  bubbles: true,
  composed: true,
  detail: { data: 'value' }
}));

// Parent listens
element.addEventListener('my-event', handler);
```

## Examples Explained

### Example 1: SimpleView
- Basic attribute usage
- Conditional rendering
- Simple styling

### Example 2: CounterView
- Internal state management
- Event handlers
- Manual re-rendering
- `bind(this)` context preservation

### Example 3: InputView
- Form inputs
- CustomEvent dispatching
- Child-to-parent communication

### Example 4: ParentView
- Listening to multiple children
- State aggregation
- Coordinating components

## Important Concepts

1. **Why extend BaseComponent?**
   - Inherits common functionality (Shadow DOM, attribute handling, render scheduling)
   - Reduces boilerplate code
   - Provides consistent API across components

2. **Why use Shadow DOM?**
   - Style encapsulation (CSS doesn't leak in/out)
   - DOM encapsulation (internal structure is hidden)
   - Prevents ID/class name conflicts

3. **Why use `requestAnimationFrame`?**
   - Batches multiple render calls into one
   - Optimizes performance
   - Prevents unnecessary re-renders

4. **Why use `bind(this)`?**
   - Event handlers lose `this` context by default
   - `bind(this)` ensures methods can access component instance

## Next Steps

After mastering these concepts, you'll be ready to add:
- Routing (hash-based navigation)
- State management (singleton model)
- More complex component patterns

## Teacher's Original Code

The `BaseComponent.ts` file is copied directly from the teacher's `v8a MVC` project, demonstrating production-quality frameworkless architecture.
