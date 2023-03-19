import { ScullyConfig } from '@scullyio/scully';
import '@scullyio/scully-plugin-puppeteer'

import { TranslateRouterConfig, registerNgxTranslateRouter } from './dist/ngx-translate-router-scully-plugin';

const translateConfig: TranslateRouterConfig = {
  langs: {
    en: './src/assets/i18n/en.json',
    fr: './src/assets/i18n/fr.json',
  }
};

registerNgxTranslateRouter(translateConfig);


export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "scully-plugins",
  outDir: './dist/static',
  routes: {}
};