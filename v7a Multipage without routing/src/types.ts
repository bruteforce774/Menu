export interface AppState {
    menuItems: MenuItem[];
    categories: string[];
    currentPage?: string;
    currentId?: number;
}

export interface MenuItem {
    id: number;
    name: string;
    price: number;           
    category: string;
    description?: string;
    imageUrl?: string;
}