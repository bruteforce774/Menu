# BaseComponent Inheritance Practice

This project demonstrates how to use inheritance with the `BaseComponent` class to build frameworkless web applications, aligned with the teacher's curriculum.

## Project Structure

```
inheritance/
├── src/
│   ├── components/
│   │   └── BaseComponent.ts       # Base class (from teacher's code)
│   ├── views/
│   │   ├── SimpleView.ts          # Example 1: Basic attributes
│   │   ├── CounterView.ts         # Example 2: Internal state
│   │   ├── FormInputView.ts       # Example 3: Form inputs (proper pattern)
│   │   ├── FormContainerView.ts   # Example 3: Form container
│   │   ├── ParentView.ts          # Example 4: Parent-child communication
│   │   └── InputView.ts           # Reference: Shows the focus loss problem
│   └── main.ts                    # Entry point
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
- Simple styling with Shadow DOM

### Example 2: CounterView
- Internal state management (`private count`)
- Event handlers with `bind(this)`
- Manual re-rendering via `this.render()`
- Dispatches custom events for parent communication

### Example 3: FormInputView & FormContainerView (Teacher's Pattern)

**THE FOCUS LOSS PROBLEM:**

When a form component re-renders by calling `render()`, it replaces `innerHTML`, which:
1. Destroys all DOM elements (including input fields)
2. Creates new DOM elements
3. New input fields lose focus
4. User can only type one character at a time!

**THE SOLUTION (from Teacher's FormAndList v5):**

Store input values in **instance properties**, not in the DOM:

```typescript
export class FormInputView extends BaseComponent {
  // Store value HERE, not in DOM
  private currentValue: string = '';

  render() {
    this.shadowRoot!.innerHTML = `<input type="text" value="${this.currentValue}" />`;
    
    const input = this.shadowRoot!.querySelector('input')!;
    
    // Update instance property on every keystroke
    input.addEventListener('input', () => {
      this.currentValue = input.value;  // ← Store in instance
    });
    
    // Only dispatch event when user explicitly submits
    button.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('value-submitted', {
        detail: { value: this.currentValue }  // ← Use stored value
      }));
    });
  }
}
```

**Why this works:**
1. User types → value stored in `this.currentValue`
2. Parent receives event and may trigger re-render
3. Child's `render()` is called → new input created with `value="${this.currentValue}"`
4. Input shows the correct value because it comes from the persistent instance property
5. Focus is on the new input, but it has the correct value

**Key insight:** Separate "where the value is displayed" (DOM) from "where the value is stored" (instance property).

### Example 4: ParentView
- Listens to events from multiple children
- Aggregates state from children
- Coordinates multiple components
- Uses counters (buttons) to avoid form complexity

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
   - Ensures renders happen at animation frame boundaries

4. **Why use `bind(this)`?**
   - Event handlers lose `this` context by default
   - `bind(this)` ensures methods can access component instance
   - Alternative: Arrow functions (but creates new function each render)

5. **Why store form values in instance properties?**
   - Prevents focus loss when component re-renders
   - Separates data storage from presentation
   - Allows parent to trigger child re-render safely

## Common Pitfalls

### ❌ **DON'T: Re-render on every keystroke**
```typescript
handleInput(event: Event) {
  this.value = input.value;
  this.render();  // ← This recreates the input, causing focus loss!
}
```

### ✅ **DO: Store value locally, render only when necessary**
```typescript
private currentValue = '';

handleInput(event: Event) {
  this.currentValue = input.value;  // ← Store but don't re-render
}

handleSubmit() {
  // Use this.currentValue here
  this.render();  // ← OK to re-render now (input not focused)
}
```

## Next Steps

After mastering these concepts, you'll be ready to add:
- Routing (hash-based navigation) - see Menu v7b, v7c
- State management (singleton model) - see Menu v8a MVC
- More complex component patterns
- Virtual DOM diffing (applyDiff pattern)

## Alignment with Teacher's Curriculum

This practice project aligns with:
- **FormAndList v5**: Class-based components with proper form handling
- **FormAndList v5b**: BaseComponent inheritance to reduce duplication
- **FilesAndFolders v5**: Advanced BaseComponent with scheduleRender
- **Menu v7a**: Web Components without routing
- **Menu v8a MVC**: Full MVC pattern with routing and state

The `BaseComponent.ts` file is copied directly from the teacher's `v8a MVC` project.
