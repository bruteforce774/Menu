import type { MenuItem, AppState } from "./types";
import { initialAppState } from "./initialAppState";

export class AppModel {
    private state: AppState;
    private subscribers: Function[] = [];

    constructor(initialState?: AppState) {
        this.state = initialState || { menuItems: [], categories: [] };
    }

    // hjelpemetode for å lese detaljer i tilstand
    public static getMenuItem(id: number, state: AppState): MenuItem | undefined {
        return state.menuItems.find(mi => mi.id === id);
    }
    
    public subscribe(subscriber: Function): Function {
        this.subscribers.push(subscriber);
        const state = this.getState();
        subscriber(state);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
        };
    }

    private notifySubscribers(): void {
        const state = this.getState();
        for (const subscriber of this.subscribers) {
            subscriber(state);
        }
    }

    private getState() {
        return Object.freeze(structuredClone(this.state));
    }

    // controller-metoder for å endre tilstanden
    public addCategory(category: string): void {
        this.state.categories.push(category);
        this.notifySubscribers();
    }

    public addMenuItem(menuItem: MenuItem): void {
        const maxId = this.state.menuItems.reduce((max, mi) => mi.id > max ? mi.id : max, 0);
        menuItem.id = maxId + 1;
        this.state.menuItems.push(menuItem);
        this.notifySubscribers();
    }

    public deleteMenuItem(menuItemId: number){
        this.state.menuItems = this.state.menuItems.filter(mi=>mi.id!=menuItemId);
        this.notifySubscribers();
    }
}

export const appModel = new AppModel(initialAppState);
