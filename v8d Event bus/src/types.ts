export type AppEvent = 
    | { type: 'SELECTED_CATEGORY', category: string }
    | { type: 'SELECTED_MENU_ITEM', menuItemId: number }
    | { type: 'ADDED_CATEGORY', category: string }
    | { type: 'ADDED_MENU_ITEM', menuItem: MenuItem }
    | { type: 'NAVIGATED', route: RouteEventDetail }
    | { type: 'DELETED', menuItemId: number }
    ;

export type AppEventType = AppEvent["type"];
export type EventOf<T extends AppEventType> = Extract<AppEvent, { type: T }>;   

export type RouteEventDetail = {
    name: string;
    param: Params;
}

export interface AppState {
    menuItems: MenuItem[];
    categories: string[];
}

export interface MenuItem {
    id: number;
    name: string;
    price: number;           
    category: string;
    description?: string;
    imageUrl?: string;
}

export interface Route {
    path: string;
    handler: HandlerFunction;
}

export type MenuItemParams = { id: string };
export type MenuCategoryParams = { category: string };
export type DummyParams = { country: string; city: string; zip: string };
export type Params = MenuCategoryParams | MenuItemParams | DummyParams;

export type HandlerFunction = 
    (params?: Params) => void;