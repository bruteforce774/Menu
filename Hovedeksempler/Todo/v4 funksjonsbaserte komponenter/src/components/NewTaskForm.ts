import type { DispatchFunction } from '../types';
import { addEventListener } from '../common';

export function NewTaskForm(dispatch: DispatchFunction): HTMLElement {
    const mainElement = document.createElement('div');
    let description = '';
    mainElement.innerHTML =/*HTML*/`
        <fieldset>
            <legend>Ny oppgave</legend>
            Beskrivelse:<br/>
            <input type="text"/><br/>
            <button>Registrer ny oppgave</button>
        </fieldset>
    `;
    addEventListener(mainElement, 'input', 'input', (value: any) => description = value);
    addEventListener(mainElement, 'button', 'click', () => dispatch('addTask', description));
    return mainElement;
}
