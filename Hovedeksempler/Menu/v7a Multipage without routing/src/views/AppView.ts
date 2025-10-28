import { BaseComponent } from "../components/BaseComponent";
import { initialAppState } from "../initialAppState";

export class AppView extends BaseComponent {
  private state = initialAppState;

  render() {
    this.shadowRoot!.innerHTML = /*HTML*/ `
      <h1>Meny</h1>
      <main></main>
    `;

    const main = this.shadowRoot!.querySelector('main')!;
    if (!this.state.currentPage || this.state.currentPage === 'menu') {
      this.renderMenu(main);
    } else if (this.state.currentPage.startsWith('menu-item')) {
      this.renderMenuItem(main);
    }
  }

  private renderMenuItem(main: HTMLElement) {
    const menuItemView = document.createElement('menu-item-view') as BaseComponent;
    const menuItem = this.state.menuItems.find(i => i.id === this.state.currentId);
    if (menuItem) {
      menuItemView.set('menu-item', menuItem);
      menuItemView.addEventListener('back-to-menu', this.handleBackToMenu.bind(this));
      main.appendChild(menuItemView);
    }
  }

  private renderMenu(main: HTMLElement) {
    const menuView = document.createElement('menu-view') as BaseComponent;
    menuView.set('menu-items', this.state.menuItems);
    menuView.set('categories', this.state.categories);
    menuView.addEventListener('menu-item-selected', this.handleMenuItemSelected.bind(this));
    main.appendChild(menuView);
  }

  private handleBackToMenu() {
    this.state.currentPage = 'menu';
    this.state.currentId = undefined;
    this.render();
  }

  private handleMenuItemSelected(event: Event) {
    const customEvent = event as CustomEvent;
    const { id } = customEvent.detail;
    this.state.currentPage = 'menu-item';
    this.state.currentId = id;
    this.render();
  }
}
