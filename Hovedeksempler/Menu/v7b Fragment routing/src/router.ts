import type { Route, HandlerFunction } from './types';

export default class Router {
    routes: Route[];
    notFoundHandler: HandlerFunction | null;

    constructor() {
        this.routes = [];
        this.notFoundHandler = null;
    }

    addRoute(path: string, handler: HandlerFunction) {
        if (path.includes('/') && !path.includes('/:value'))
            throw new Error('Routes with parameters must use ":value" as parameter placeholder.');
        this.routes.push({ path, handler });
        return this;
    }

    setNotFound(handler: HandlerFunction) {
        this.notFoundHandler = handler;
        return this;
    }

    handleRoute() {
        const hash = window.location.hash || '#';

        // eksempel: hash = '#list/42'
        if (hash.includes('/')) {
            const [path, value] = hash.split('/');
            this.handleFoundRoute(path + '/:value', decodeURI(value));
        } else {
            this.handleFoundRoute(hash);
        }
    }

    handleFoundRoute(path: string, value?: string) {
        const route = this.routes.find(r => r.path === path);
        if (route) {
            route.handler(value);
        } else if (this.notFoundHandler) {
            this.notFoundHandler();
        }
    }

    navigate(path: string) {
        window.location.hash = path;
    }

    build() {
        window.addEventListener('hashchange', this.handleRoute.bind(this));
        return this;
    }
}
