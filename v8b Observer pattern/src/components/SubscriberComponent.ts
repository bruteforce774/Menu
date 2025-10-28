import { BaseComponent } from "./BaseComponent";
import { appModel } from "../appModel";
import type { AppState } from "../types";

export class SubscriberComponent extends BaseComponent {
    protected state: AppState | null = null;
    private unsubscribeFn: Function | null = null;

    connectedCallback(): void {
        super.connectedCallback();
        this.unsubscribeFn = appModel.subscribe((state: AppState) => {
            this.state = state;
            this.scheduleRender();
        });
    }

    disconnectedCallback(): void {
        this.unsubscribeFn?.();
        this.unsubscribeFn = null;
    }
}