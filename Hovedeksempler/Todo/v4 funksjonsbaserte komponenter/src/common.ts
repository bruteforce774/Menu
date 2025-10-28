export function addEventListener(el: HTMLElement, selector: string, event: string, handler: Function) {
     const element = el.querySelector(selector) as HTMLElement;
        element.addEventListener(event, (ev: Event) => {
            const target = ev.target as HTMLElement;
            handler(target.value);
        });
}