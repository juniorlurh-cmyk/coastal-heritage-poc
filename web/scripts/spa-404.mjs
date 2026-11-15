// GitHub Pages serves 404.html for unknown paths — shipping a copy of
// index.html as 404.html lets the React router handle /about, /services,
// /projects, /contact as real URLs on a static host.
import { copyFileSync } from 'node:fs';

copyFileSync('dist/index.html', 'dist/404.html');
console.log('Created dist/404.html (SPA fallback for GitHub Pages)');
