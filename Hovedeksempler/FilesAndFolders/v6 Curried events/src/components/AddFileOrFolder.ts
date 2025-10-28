import { BaseComponent } from "../components/BaseComponent";

export class AddFileOrFolder extends BaseComponent {
    private state = {
        name: '',
        errorMessage: '',
    };
    render() {
        this.shadowRoot!.innerHTML = /*HTML*/`
            <fieldset>
                <legend>Legg til fil eller mappe</legend>
                <div style="color:red">${this.state.errorMessage}</div>
                <input type="text"/>
                <button>Ny fil</button>
                <button>Ny mappe</button>
            </fieldset>
        `;
        const input = this.shadowRoot!.querySelector('input');
        input?.addEventListener('input', () => this.state.name = input.value);
        const btns = this.shadowRoot!.querySelectorAll('button');
        btns[0].addEventListener('click', this.createClickHandler(true));
        btns[1].addEventListener('click', this.createClickHandler(false));
    }

    createClickHandler(isFile: boolean) {
        return (e: Event) => {
            const detail = {
                isFile: isFile,
                name: this.state.name,
            };
            if (!detail.name || detail.name.length == 0) {
                this.state.errorMessage = 'Du må skrive inn et navn!';
                this.render();
            } else {
                const event = new CustomEvent('content-added', { detail });
                this.dispatchEvent(event);
            }
        }
    }
}


