import { BaseComponent } from "../components/BaseComponent";
import { initialAppState } from "../initialAppState";
import type { MenuItem, Params, MenuCategoryParams, MenuItemParams, DummyParams } from "../types";
import { router } from "../routerInstance";



export class AppView extends BaseComponent {
  private state = initialAppState;

  constructor() {
    super();
    router
      .addRoute('#', (params?: Params) => this.renderMenu(this.getMain()))
      .addRoute('#menu', (params?: Params) => this.renderMenu(this.getMain()))
      .addRoute('#menu/:category', (params?: Params) => this.renderMenu(this.getMain(), params!))
      .addRoute('#menu-item/:id', (params?: Params) => this.renderMenuItem(this.getMain(), params!))
      .addRoute('#dummy/:country/:city/:zip', (params?: Params) => this.renderDummy(this.getMain(), params!))
      .setNotFound(() => {
        const main = this.getMain();
        const el = document.createElement('div');
        el.innerHTML = '<h2>Page not found</h2>';
        el.style.color = 'red';
        main.replaceChildren(el);
      })
      .build();
  }

  render() {
    this.shadowRoot!.innerHTML = /*HTML*/ `
      <h1>Meny</h1>
      <main></main>
    `;
    router.handleRoute();
  }

  private getMain() {
    return this.shadowRoot!.querySelector('main')!;
  }

  private renderMenuItem(main: HTMLElement, params: Params) {
    const menuItemParams = params as MenuItemParams;
    const menuItemView = document.createElement('menu-item-view') as BaseComponent;
    const menuItem = this.state.menuItems.find((mi: MenuItem) => mi.id === parseInt(menuItemParams.id));
    if (menuItem) {
      menuItemView.set('menu-item', menuItem);
      main.replaceChildren(menuItemView);
    }
  }

  private renderMenu(main: HTMLElement, params?: Params) {
    const categoryParams = params ? params as MenuCategoryParams : { category: undefined };
    const menuView = document.createElement('menu-view') as BaseComponent;
    menuView.set('menu-items', this.state.menuItems);
    menuView.set('categories', this.state.categories);
    if (categoryParams.category) menuView.set('selected-category', categoryParams.category);
    main.replaceChildren(menuView);
  }

  private renderDummy(main: HTMLElement, params: Params) {
    const dummyParams = params as DummyParams;
    const el = document.createElement('div');
    el.innerHTML = /*HTML*/`
      <h2>Dummy View</h2>
      <p>Country: ${dummyParams.country}</p>
      <p>City: ${dummyParams.city}</p>
      <p>Zip: ${dummyParams.zip}</p>
    `;
    main.replaceChildren(el);
  }
}