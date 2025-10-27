import { BaseComponent } from "../components/BaseComponent";
import { appModel } from "../appModel";

export class AdminView extends BaseComponent {
    render() {
        const state = appModel.state;
        this.shadowRoot!.innerHTML = /*HTML*/`
            <h2>Admin Panel</h2>
            <h3>Kategorier</h3>
            <ul id="category-list">
                ${state.categories.map(cat => `
                    <li>
                        ${cat} <button data-category="${cat}" class="delete-category">Slett</button>
                    </li>
                `).join('')}
            </ul>
            <h3>Produkter</h3>
            <ul id="product-list">
                ${state.menuItems.map(item => `
                    <li>
                        ${item.name} (${item.category}) <button data-id="${item.id}" class="delete-product">Slett</button>
                    </li>
                `).join('')}
            </ul>
        `;
        this.shadowRoot!.querySelector('#category-list')?.addEventListener('click', this.handleDeleteCategory.bind(this));
        this.shadowRoot!.querySelector('#product-list')?.addEventListener('click', this.handleDeleteProduct.bind(this));
    }

    private handleDeleteCategory(event: Event) {
        const target = event.target as HTMLElement;
        if (target.classList.contains('delete-category')) {
            const category = target.getAttribute('data-category');
            if (category && confirm(`Slett kategori "${category}"? Dette vil også slette alle produkter i kategorien.`)) {
                appModel.deleteCategory(category);
                this.render();
            }
        }
    }

    private handleDeleteProduct(event: Event) {
        const target = event.target as HTMLElement;
        if (target.classList.contains('delete-product')) {
            const id = target.getAttribute('data-id');
            if (id && confirm('Slett produkt?')) {
                appModel.deleteMenuItem(Number(id));
                this.render();
            }
        }
    }
}
