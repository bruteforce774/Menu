import { BaseComponent } from "../components/BaseComponent";
import type { MenuItem } from "../types";
import { router } from "../routerInstance";

export class MenuItemView extends BaseComponent {
    static props = ['menu-item'];
    get menuItem(): MenuItem {
        return (this.get('menu-item') || []) as MenuItem;
    }
    render() {
        const item = this.menuItem;
        this.shadowRoot!.innerHTML = /*HTML*/ `
            <h3>${item.name}</h3>
            <div>
                <p>Pris: ${item.price} kr</p>
                <p>${item.description || ''}</p>
                <img src="${item.imageUrl || ''}" alt="${item.name}" width="200"/> 
            </div>
            <button>Tilbake til meny</button>
        `;
        const backButton = this.shadowRoot!.querySelector('button');
        backButton?.addEventListener('click', this.handleBackClick.bind(this));
    }

    handleBackClick(){
        router.navigate('#menu');
        // const event = new CustomEvent('back-to-menu', {});
        // this.dispatchEvent(event);
    }
}
