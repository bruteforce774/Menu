import { BaseComponent } from "../components/BaseComponent";

export class MyApp extends BaseComponent {
    render() {
        this.shadowRoot!.innerHTML = /*HTML*/`
            <date-selector></date-selector>
        `;
    }
}


