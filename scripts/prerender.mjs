import { spawnSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const outputDir = path.resolve('dist');
const ssrBuild = spawnSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build', '--config', 'vite.prerender.config.js'], { stdio: 'inherit' });
if (ssrBuild.status !== 0) process.exit(ssrBuild.status || 1);

const { prerenderPaths, prerenderBasePath, renderPrerenderedPage, getSeoMetadata } = await import(pathToFileURL(path.resolve('.prerender/entry-prerender.js')).href);
const escapeAttribute = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const replaceMeta = (html, attribute, value, content) => {
  const tag = `<meta ${attribute}="${value}" content="${escapeAttribute(content)}" />`;
  const pattern = new RegExp(`<meta\\s+${attribute}="${value}"\\s+content="[^"]*"\\s*\\/>`);
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
};
const template = await readFile(path.join(outputDir, 'index.html'), 'utf8');
const siteUrl = (process.env.VITE_SITE_URL || 'https://hayyannadeem125.github.io/Tellamind').replace(/\/+$/, '');

for (const route of prerenderPaths) {
  const metadata = getSeoMetadata(route, siteUrl);
  const markup = renderPrerenderedPage(route);
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${metadata.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeAttribute(metadata.description)}" />`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${markup}</div>`);
  html = replaceMeta(html, 'property', 'og:title', metadata.title);
  html = replaceMeta(html, 'property', 'og:description', metadata.description);
  html = replaceMeta(html, 'property', 'og:url', metadata.canonical);
  html = replaceMeta(html, 'name', 'twitter:title', metadata.title);
  html = replaceMeta(html, 'name', 'twitter:description', metadata.description);
  const headTags = [
    `<link rel="canonical" href="${escapeAttribute(metadata.canonical)}" />`,
    `<script id="tellamind-structured-data" type="application/ld+json">${JSON.stringify(metadata.schema).replaceAll('<', '\\u003c')}</script>`,
  ].join('\n    ');
  html = html.replace('</head>', `    ${headTags}\n  </head>`);
  const relativePath = route === '/' ? 'index.html' : path.join(route.replace(/^\/+|\/+$/g, ''), 'index.html');
  const destination = path.join(outputDir, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html);
}

const homePath = `${prerenderBasePath || ''}/`;
await writeFile(path.join(outputDir, '404.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | TellaMind</title><style>body{margin:0;background:#090806;color:#f7ebdc;font:16px/1.6 system-ui,sans-serif;display:grid;min-height:100vh;place-items:center}.card{max-width:38rem;padding:3rem;border:1px solid #80652f;border-radius:1rem;background:#17130d}a{color:#e0bd68}h1{font-size:clamp(2rem,6vw,3.5rem);line-height:1.1}</style></head><body><main class="card"><p>TELLAMIND · PAGE NOT FOUND</p><h1>This page took a different path.</h1><p>The link may have changed or the page may no longer be available.</p><a href="${homePath}">Return to the TellaMind homepage</a></main></body></html>`);
console.log(`Pre-rendered ${prerenderPaths.length} routes for ${siteUrl}.`);
