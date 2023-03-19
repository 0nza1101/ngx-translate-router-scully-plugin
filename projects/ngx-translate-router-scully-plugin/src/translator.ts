import { HandledRoute } from '@scullyio/scully';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { TranslateRouterConfig } from './translate-router-config';

interface InternalConfig {
    config: TranslateRouterConfig;
    localizeConfig: {
        prefix: string
        escapePrefix: string
    };
    translation?: any;
}

export async function parseRoutes(routes: HandledRoute[], config: TranslateRouterConfig) {
    const localizeConfig = await getLocalizeConfig();
    const newRoutes = [];
    const langKeys = Object.keys(config.langs);
    for (const langKey of langKeys) {
        const subRoutes = await translateRoutes(langKey, config.langs[langKey], routes, { localizeConfig, config });
        newRoutes.push(...subRoutes);
    }
    return newRoutes;
}

async function getLocalizeConfig() {
    let localizeConfig = {
        prefix: 'ROUTES.',
        escapePrefix: '',
    };
    const localizeConfigPath = join(process.cwd(), './src/assets/locales.json');
    const isLocalizeConfigExist = existsSync(localizeConfigPath);
    if (isLocalizeConfigExist) {
        // localizeConfig = await import(localizeConfigPath);
        localizeConfig = readJson(localizeConfigPath);
    }
    return localizeConfig;
}

async function translateRoutes(lang: string, filePath: string, routeList: HandledRoute[], internalConfig: InternalConfig) {
    // const translation = await import(join(process.cwd(), filePath));
    const translation = readJson(join(process.cwd(), filePath));
    const config = { ...internalConfig, translation };
    return routeList.reduce((result: HandledRoute[], element: HandledRoute) => {
        if (element.type === 'default') {
            const translatedRoute = '/' + lang + translateRoute(config, element.route);
            result.push({ ...element, route: translatedRoute });
        } else if (element?.data?.lang === lang) {
            const translatedRoute = '/' + lang + translateRoute(config, element.route);
            result.push({ ...element, route: translatedRoute });
        }
        return result;
    }, []);
}

function translateRoute(internalConfig: InternalConfig, path: string): string {
    const { prefix, escapePrefix } = internalConfig.localizeConfig;
    const translation = internalConfig.translation;
    const translateText = (key: string) => {
        if (escapePrefix && key.startsWith(escapePrefix)) {
            return key.replace(escapePrefix, '');
        } else {
            if (!translation) {
                return key;
            }
            const fullKey = prefix + key;
            const res = getPropValue(translation, fullKey);
            return res !== fullKey ? res : key;
        }
    };

    const queryParts = path.split('?');
    if (queryParts.length > 2) {
        throw Error('There should be only one query parameter block in the URL');
    }
    const pathSegments = queryParts[0].split('/');

    return pathSegments
        .map((part: string) => part.length ? translateText(part) : part)
        .join('/') +
        (queryParts.length > 1 ? `?${queryParts[1]}` : '');
}

function getPropValue(obj: any, path: string) {
    const value = path.split('.').reduce((acc, part) => acc && acc[part], obj) ?? obj[path];
    return value ? value : path;
}

function readJson(path: string) {
    try {
        return JSON.parse(readFileSync(path).toString());
    } catch {
        // console.error(`File ${path} not found, returning undefined`);
        return undefined;
    }
};