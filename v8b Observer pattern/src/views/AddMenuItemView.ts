import { BaseComponent } from "../components/BaseComponent";
import type { MenuItem } from "../types";
import { router } from "../routerInstance";
import { appModel } from "../appModel";

export class AddMenuItemView extends BaseComponent {
    private category = '';
    private name = '';
    private price: any = '';
    private description = ''
    private imageUrl = '';

    render() {
        this.shadowRoot!.innerHTML = /*HTML*/ `
            <h3>Ny kategori</h3>
            <input id="category" type="text" placeholder="Kategori" value="${this.category}"/><br/>
            <input id="name" type="text" placeholder="Navn" value="${this.name}"/><br/>
            <input id="price" type="number" placeholder="Pris" value="${this.price}"/><br/>
            <input id="description" type="text" placeholder="Beskrivelse" value="${this.description}"/><br/>
            <input id="imageUrl" type="text" placeholder="Bilde-URL" value="${this.imageUrl}"/><br/>
            <button>Legg til</button>
        `;
        this.shadowRoot!.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            const fieldName = target.id;
            this[fieldName] = target.value;
            console.log(this.category, this.name, this.price, this.description, this.imageUrl);
        });
        const addButton = this.shadowRoot!.querySelector('button');
        addButton?.addEventListener('click', this.handleAddClick.bind(this));
    }

    handleAddClick() {
        const menuItem: MenuItem = {
            id: 0, 
            name: this.name, 
            price: parseFloat(this.price), 
            category: this.category, description: 
            this.description, 
            imageUrl: this.imageUrl
        };
        appModel.addMenuItem(menuItem);
        router.navigate(`#menu-item/${menuItem.id}`);
    }
}
