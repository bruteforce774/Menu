import { SubscriberComponent } from "../components/SubscriberComponent";
import { router } from "../routerInstance";
import { AppModel } from "../appModel";

export class MenuItemView extends SubscriberComponent {
    static props = ['id'];
    get menuItemId(): number {
        return parseInt(this.get('id') || '');
    }
    render() {
        const item = AppModel.getMenuItem(this.menuItemId, this.state!)!;
        this.state;
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
