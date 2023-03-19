# @0nza1101/ngx-translate-router-scully-plugin

[![npm version](https://badge.fury.io/js/@0nza1101%2Fngx-translate-router-scully-plugin.svg)](https://badge.fury.io/js/@0nza1101%2Fngx-translate-router-scully-plugin)

This Scully plugin allows you to use ngx-translate-router. This plugin works with the latest Scully and Angular version. 
It doesn't import [@gilsdav/ngx-translate-router](https://github.com/gilsdav/ngx-translate-router) as a dependencie, that means it uses no Angular package to do the job.


## Installation
```
$ npm install @0nza1101/ngx-translate-router-scully-plugin --save-dev
```

## Usage

First, import the registerNgxTranslateRouter function into your Scully config file

```typescript
import { registerNgxTranslateRouter } from '@0nza1101/ngx-translate-router-scully-plugin';
```

Now register the plugin by calling this function giving your different language files

```typescript
registerNgxTranslateRouter({
  langs: {
    en: './src/assets/locales/en.json',
    fr: './src/assets/locales/fr.json'
  }
});
```