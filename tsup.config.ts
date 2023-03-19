import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['projects/ngx-translate-router-scully-plugin/src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  tsconfig: 'projects/ngx-translate-router-scully-plugin/tsconfig.lib.json',
  dts: true,
  outDir: './dist/ngx-translate-router-scully-plugin'
});