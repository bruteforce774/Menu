import type { AppEvent, AppEventType, EventOf } from './types';

export class EventBus {
    private listeners = new Map<AppEventType, Set<(e: AppEvent) => void>>();

    //on(type: AppEventType, fn: Function): void {
    on<T extends AppEventType>(type: T, fn: (e: EventOf<T>) => void): () => void {
        if (!this.listeners.has(type)) this.listeners.set(type, new Set());
        const set = this.listeners.get(type)!;
        const wrapped = fn as unknown as (e: AppEvent) => void;
        set.add(wrapped);
        return () => set.delete(wrapped);
    }

    emit<E extends AppEvent>(event: E): void {
        this.listeners.get(event.type)?.forEach(fn => fn(event));
    }

    clear() { this.listeners.clear(); }
}

export const eventBus = new EventBus();

/*
const eventBus = new EventBus();

eventBus.on('SELECTED_CATEGORY', (category) => {
    console.log(`Valgt kategori: ${category}`);
});


// et annet sted i koden
eventBus.emit({ type: 'SELECTED_CATEGORY', category: 'Drikkevarer' });
*/

/* 
ligner litt på:
el.addEventListener('click', (e) => {
    console.log(`klikket: ${e.target}`);
});

og

el.dispatchEvent(new CustomEvent('CATEGORY_SELECTED', {
    detail: 'Drikkevarer'
}));
*/