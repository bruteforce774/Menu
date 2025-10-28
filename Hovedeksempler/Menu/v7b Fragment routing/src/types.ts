export interface AppState {
    menuItems: MenuItem[];
    categories: string[];
    currentPage?: string;
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

export type HandlerFunction = 
    (value?: string) => void;