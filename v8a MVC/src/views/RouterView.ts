import { BaseComponent } from "../components/BaseComponent";
import type { Params, MenuCategoryParams, MenuItemParams } from "../types";
import { router } from "../routerInstance";

export class RouterView extends BaseComponent {
  constructor() {
    super();
    router
      .addRoute('#', (params?: Params) => this.renderMenu(this.getMain()))
      .addRoute('#menu', (params?: Params) => this.renderMenu(this.getMain()))
      .addRoute('#menu/:category', (params?: Params) => this.renderMenu(this.getMain(), params!))
      .addRoute('#menu-item/:id', (params?: Params) => this.renderMenuItem(this.getMain(), params!))
      .addRoute('#add-category', (params?: Params) => this.renderAddCategory(this.getMain(), params!))
      .addRoute('#add-menu-item', (params?: Params) => this.renderAddMenuItem(this.getMain(), params!))
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
    menuItemView.set('id', parseInt(menuItemParams.id));
    main.replaceChildren(menuItemView);
  }

  private renderMenu(main: HTMLElement, params?: Params) {
    const categoryParams = params ? params as MenuCategoryParams : { category: undefined };
    const menuView = document.createElement('menu-view') as BaseComponent;
    if (categoryParams.category) menuView.set('selected-category', categoryParams.category);
    main.replaceChildren(menuView);
  }

  private renderAddCategory(main: HTMLElement, params?: Params) {
    const addCategoryView = document.createElement('add-category-view') as BaseComponent;
    main.replaceChildren(addCategoryView);
  }

  private renderAddMenuItem(main: HTMLElement, params?: Params) {
    const addMenuItemView = document.createElement('add-menu-item-view') as BaseComponent;
    main.replaceChildren(addMenuItemView);
  }
}