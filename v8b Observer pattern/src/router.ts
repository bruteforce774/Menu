import type { Route, HandlerFunction, Params } from './types';

export default class Router {
    routes: Route[];
    notFoundHandler: HandlerFunction | null;

    constructor() {
        this.routes = [];
        this.notFoundHandler = null;
    }

    addRoute(path: string, handler: HandlerFunction) {
        this.routes.push({ path, handler });
        return this;
    }

    setNotFound(handler: HandlerFunction) {
        this.notFoundHandler = handler;
        return this;
    }

    handleRoute() {
        const hash = window.location.hash || '#';

        // eksempel: hash = '#dummy/Norway/Oslo/0010'
        if (hash.includes('/')) {
            const [path, ...paramValues] = hash.split('/');
            const route = this.routes.find(r => r.path.startsWith(path + '/:'));
            if (!route) {
                if (this.notFoundHandler) this.notFoundHandler();
            }
            // eksempel: route.path = '#dummy/:country/:city/:zip'
            const paramNames = route?.path.split('/').slice(1); // [':country', ':city', ':zip']
            const params: any = {};
            for (let paramName of paramNames!) {
                const cleanName = paramName.replace(':', '');
                params[cleanName] = decodeURI(paramValues.shift()!);
            }
            route?.handler(params);
        } else {
            this.handleFoundSimpleRoute(hash);
        }
    }

    handleFoundSimpleRoute(path: string) {
        const route = this.routes.find(r => r.path === path);
        if (route) {
            route.handler();
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
