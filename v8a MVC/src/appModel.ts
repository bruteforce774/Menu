import type { MenuItem, AppState } from "./types";
import { initialAppState } from "./initialAppState";

export class AppModel {
    private _state: AppState;

    constructor(initialState?: AppState) {
        this._state = initialState || { menuItems: [], categories: [] };
    }

    // les ut tilstanden til rendering i viewene
    public get state(): AppState {
        return Object.freeze(structuredClone(this._state));
    }

    // hjelpemetode for å lese detaljer i tilstand
    public getMenuItem(id: number): MenuItem | undefined {
        return this.state.menuItems.find(mi => mi.id === id);
    }

    // controller-metoder for å endre tilstanden
    public addCategory(category: string): void {
        this._state.categories.push(category);
    }

    public addMenuItem(menuItem: MenuItem): void {
        const maxId = this._state.menuItems.reduce((max, mi) => mi.id > max ? mi.id : max, 0);
        menuItem.id = maxId + 1;
        this._state.menuItems.push(menuItem);
    }

    // Slett kategori
    public deleteCategory(category: string): void {
        this._state.categories = this._state.categories.filter(cat => cat !== category);
        // Optionally, also remove menu items in this category
        this._state.menuItems = this._state.menuItems.filter(mi => mi.category !== category);
    }

    // Slett menyartikkel
    public deleteMenuItem(id: number): void {
        this._state.menuItems = this._state.menuItems.filter(mi => mi.id !== id);
    }
}

export const appModel = new AppModel(initialAppState);
