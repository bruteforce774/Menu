import type { MenuItem } from "../types";
import { router } from "../routerInstance";
import { SubscriberComponent } from "../components/SubscriberComponent";
import { appModel } from "../appModel";

export class MenuView extends SubscriberComponent {
    static props = ['selected-category'];

    get selectedCategory(): string | null {
        return (this.get('selected-category') || null) as string | null;
    }

    render() {
        if (!this.state) return;
        this.shadowRoot!.innerHTML = /*HTML*/ `
            <h3>Kategorier</h3>
            <div id="categories">
                ${this.state!.categories.map((category: any) => /*HTML*/`   
                    <button ${category === this.selectedCategory ? 'disabled' : ''}>${category}</button>
                `).join('')}
            </div>
            <h3>Produkter ${this.selectedCategory ? `i kategorien ${this.selectedCategory}` : ''}</h3>
            <div id="menu-items">
                ${this.createMenuItemList(this.state!.menuItems)}
            </div>
        `;
        const categoryDiv = this.shadowRoot!.querySelector('#categories');
        categoryDiv?.addEventListener('click', this.handleCategoryClick.bind(this));
        const menuItemsDiv = this.shadowRoot!.querySelector('#menu-items');
        menuItemsDiv?.addEventListener('click', this.handleMenuItemClick.bind(this));
    }

    private handleCategoryClick(event: Event) {
        const target = event.target as HTMLElement;
        if (target.tagName === 'BUTTON') {
            const category = target.textContent;
            router.navigate(`#menu/${category}`);
        }
    }

    private handleMenuItemClick(event: Event) {
        const target = event.target as HTMLElement;
        if (target.tagName === 'BUTTON') {
            const menuItemId = parseInt(target.dataset.id!);
            const action = target.dataset.action;
            if (action === 'details') {
                router.navigate(`#menu-item/${menuItemId}`);
            } else if (action === 'delete') {
                appModel.deleteMenuItem(menuItemId);
            }
        }
    }

    private createMenuItemList(menuItems: MenuItem[]): string {
        if (this.selectedCategory === null) return '<i>Velg en kategori for å se menyen.</i>'
        menuItems = menuItems.filter(mi => mi.category === this.selectedCategory);
        if (menuItems.length === 0) return '<i>Ingen menyartikler i denne kategorien.</i>';
        return menuItems.map(menuItem => /*HTML*/`
            <div>
                ${menuItem.name} - ${menuItem.price} kr
                <button data-action="details" data-id="${menuItem.id}">Se detaljer</button>
                <button data-action="delete" data-id="${menuItem.id}">×</button>
            </div>
        `).join('');
    }
}
