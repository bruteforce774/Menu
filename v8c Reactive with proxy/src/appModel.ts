import type { MenuItem, AppState } from "./types";
import { initialAppState } from "./initialAppState";

/*
proxy = new Proxy(state, {
    set(target, key, value) {
        console.log(target, key, value);
        target[key]=value;
        render();
        return true;
    }
})
*/
export class AppModel {
    private _state: AppState;
    private _proxyState: AppState | null = null;

    constructor(initialState?: AppState) {
        this._state = initialState || { menuItems: [], categories: [] };
    }

    public addProxy(updateFunction: Function) {
        this._proxyState = new Proxy(this._state, {
            set: (target, key, value) => {
                target[key as keyof AppState] = value;
                updateFunction();
                return true;
            }
        });
    }

    // les ut tilstanden til rendering i viewene
    public get state(): AppState {
        return Object.freeze(structuredClone(this._state));
    }

    // hjelpemetode for å lese detaljer i tilstand
    public getMenuItem(id: number): MenuItem | undefined {
        return this._proxyState!.menuItems.find(mi => mi.id === id);
    }

    // controller-metoder for å endre tilstanden
    public addCategory(category: string): void {
        // this._proxyState!.categories.push(category);
        this._proxyState!.categories = [...this._state.categories, category];
    }

    public addMenuItem(menuItem: MenuItem): void {
        const maxId = this._state.menuItems.reduce((max, mi) => mi.id > max ? mi.id : max, 0);
        menuItem.id = maxId + 1;
        //this._proxyState!.menuItems.push(menuItem);
        this._proxyState!.menuItems = [...this._state.menuItems, menuItem];
    }

    public deleteMenuItem(menuItemId: number) {
        this._proxyState!.menuItems = this._state.menuItems.filter(mi => mi.id != menuItemId);
    }
}

export const appModel = new AppModel(initialAppState);
