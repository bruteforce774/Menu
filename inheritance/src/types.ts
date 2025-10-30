/**
 * Type definitions for inheritance practice examples
 *
 * Following teacher's pattern: centralized type definitions
 * for component state, event details, and data structures
 */

// ============================================================================
// Custom Event Detail Types
// ============================================================================

/**
 * Detail for counter-incremented CustomEvent
 * Dispatched by CounterView when count changes
 */
export interface CounterIncrementedDetail {
    label: string;
    count: number;
}

/**
 * Detail for value-submitted CustomEvent
 * Dispatched by FormInputView when user submits
 */
export interface ValueSubmittedDetail {
    label: string;
    value: string;
}

/**
 * Detail for value-changed CustomEvent
 * Dispatched by InputView on every keystroke (old pattern - shows focus loss)
 */
export interface ValueChangedDetail {
    label: string;
    value: string;
    timestamp: string;
}

// ============================================================================
// Form Data Interfaces
// ============================================================================

/**
 * Form data structure for FormContainerView
 * Aggregates data from multiple form inputs
 */
export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
}

// ============================================================================
// Custom Event Type Extensions
// ============================================================================

/**
 * Typed CustomEvent for counter increments
 * Usage: event as CounterIncrementedEvent
 */
export type CounterIncrementedEvent = CustomEvent<CounterIncrementedDetail>;

/**
 * Typed CustomEvent for form value submissions
 * Usage: event as ValueSubmittedEvent
 */
export type ValueSubmittedEvent = CustomEvent<ValueSubmittedDetail>;

/**
 * Typed CustomEvent for input value changes
 * Usage: event as ValueChangedEvent
 */
export type ValueChangedEvent = CustomEvent<ValueChangedDetail>;
