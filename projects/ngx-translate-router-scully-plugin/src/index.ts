import { HandledRoute, registerPlugin } from '@scullyio/scully';
import { TranslateRouterConfig } from './translate-router-config';
import { parseRoutes } from './translator';

export const NgxTranslateRouter = 'NgxTranslateRouter';

const translationPlugin = (config: TranslateRouterConfig) => async (routes: HandledRoute[]) => {
    return parseRoutes(routes, config);
};

export function registerNgxTranslateRouter(config: TranslateRouterConfig) {
    registerPlugin('routeProcess', NgxTranslateRouter, translationPlugin(config), 1, {});
    // setPluginConfig(NgxTranslateRouter, config);
}

export { TranslateRouterConfig } from './translate-router-config';