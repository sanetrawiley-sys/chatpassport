import { createRequire } from 'node:module';
import { pathToFileURL, fileURLToPath } from 'node:url';
const requireFromWxt = createRequire(import.meta.resolve('wxt'));
const { createServer } = await import(pathToFileURL(requireFromWxt.resolve('vite')).href);
const root = fileURLToPath(new URL('..', import.meta.url));
const server = await createServer({
  configFile: false, root,
  resolve: { alias: { 'wxt/browser': `${root}/store-assets/source/preview/browser.js` } },
  server: { host: '127.0.0.1', port: 4176, strictPort: true },
});
await server.listen();
console.log('Preview: http://127.0.0.1:4176/store-assets/source/showcase.html?shot=capture');
