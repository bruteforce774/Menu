import { BaseComponent } from "../components/BaseComponent";
import { router } from "../routerInstance";
import { appModel } from "../appModel";

export class AddCategoryView extends BaseComponent {
    private newCategory: string = '';    
    render() {
        this.shadowRoot!.innerHTML = /*HTML*/ `
            <h3>Ny kategori</h3>
            <input type="text" placeholder="Kategorinavn" value="${this.newCategory}"/>
            <button>Legg til</button>
        `;
        const input = this.shadowRoot!.querySelector('input') as HTMLInputElement;
        input.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            this.newCategory = target.value;
        });
        const addButton = this.shadowRoot!.querySelector('button');
        addButton?.addEventListener('click', this.handleAddClick.bind(this));
    }

    handleAddClick() {
        const category = this.newCategory.trim();
        if (category.length === 0) return;
        appModel.addCategory(category);
        router.navigate(`#menu/${category}`);
    }
}
