import { BaseComponent } from "../components/BaseComponent";
import { initialAppState } from "../initialAppState";
import type { MenuItem } from "../types";
import { router } from "../routerInstance";

export class AppView extends BaseComponent {
  private state = initialAppState;

  constructor() {
    super();
    router
      .addRoute('#menu', () => this.renderMenu(this.getMain()))
      .addRoute('#menu/:value', (value?: string) => this.renderMenu(this.getMain(), value!))
      .addRoute('#menu-item/:value', (value?: string) => this.renderMenuItem(this.getMain(), value!))
      .build();
  }

  render() {
    this.shadowRoot!.innerHTML = /*HTML*/ `
      <h1>Meny</h1>
      <main></main>
    `;

    const main = this.getMain();
    if (!this.state.currentPage || this.state.currentPage === 'menu') {
      this.renderMenu(main);
    } else if (this.state.currentPage.startsWith('menu-item')) {
      this.renderMenuItem(main);
    }
  }

  private getMain() {
    return this.shadowRoot!.querySelector('main')!;
  }

  private renderMenuItem(main: HTMLElement, id?: string) {
    const menuItemView = document.createElement('menu-item-view') as BaseComponent;
    const menuItem = this.state.menuItems.find((mi: MenuItem) => mi.id === parseInt(id!));
    if (menuItem) {
      menuItemView.set('menu-item', menuItem);
      // menuItemView.addEventListener('back-to-menu', this.handleBackToMenu.bind(this));
      main.replaceChildren(menuItemView);
      // main.appendChild(menuItemView);
    }
  }

  private renderMenu(main: HTMLElement, category?: string) {
    const menuView = document.createElement('menu-view') as BaseComponent;
    menuView.set('menu-items', this.state.menuItems);
    menuView.set('categories', this.state.categories);
    if (category) menuView.set('selected-category', category);
    // menuView.addEventListener('menu-item-selected', this.handleMenuItemSelected.bind(this));
    main.replaceChildren(menuView);
    // main.appendChild(menuView);
  }

  // private handleBackToMenu() {
  //   this.state.currentPage = 'menu';
  //   this.state.currentId = undefined;
  //   this.render();
  // }

  // private handleMenuItemSelected(event: Event) {
  //   const customEvent = event as CustomEvent;
  //   const { id } = customEvent.detail;
  //   this.state.currentPage = 'menu-item';
  //   this.state.currentId = id;
  //   this.render();
  // }
}
