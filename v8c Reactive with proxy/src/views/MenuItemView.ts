import { BaseComponent } from "../components/BaseComponent";
import { router } from "../routerInstance";
import { appModel } from "../appModel";

export class MenuItemView extends BaseComponent {
    static props = ['id'];
    get menuItemId(): number {
        return parseInt(this.get('id') || '');
    }
    render() {
        const item = appModel.getMenuItem(this.menuItemId)!;
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

    handleBackClick() {
        router.navigate('#menu');
    }
}
