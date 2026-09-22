import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, relative, dirname } from 'node:path';
import { load } from 'cheerio';

const root = resolve('dist');
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(resolve(dir, entry.name)) : [resolve(dir, entry.name)]);
const files = walk(root);
const html = files.filter(file => file.endsWith('.html'));
assert.equal(html.length, 17, 'Expected homepage, four sections, eleven projects and 404');
const route = file => '/' + relative(root, file).replace(/index\.html$/, '');
const site = 'https://munzbjos.github.io';
let references = 0;
function localTarget(value, current) {
  if (!value || /^(mailto:|tel:|data:|javascript:)/i.test(value)) return null;
  const url = new URL(value, site + route(current));
  if (url.origin !== site) return null;
  let path = resolve(root, '.' + decodeURIComponent(url.pathname));
  assert.ok(path === root || path.startsWith(root + '/'), `Path escapes build: ${value}`);
  if (existsSync(path) && statSync(path).isDirectory()) path = resolve(path, 'index.html');
  assert.ok(existsSync(path), `Missing local target ${value} in ${route(current)}`);
  references++;
  if (url.hash && path.endsWith('.html')) {
    const target = load(readFileSync(path, 'utf8'));
    const id = decodeURIComponent(url.hash.slice(1));
    assert.ok(target('[id]').toArray().some(element => target(element).attr('id') === id), `Missing #${id} in ${path}`);
  }
  return path;
}
const titles = new Set();
for (const file of html) {
  const $ = load(readFileSync(file, 'utf8'));
  assert.equal($('html').attr('lang'), 'en', route(file));
  assert.equal($('main').length, 1, route(file));
  assert.equal($('h1').length, 1, route(file));
  const title = $('title').text();
  assert.ok(title.length > 10 && !titles.has(title), `Missing/duplicate title: ${route(file)}`);
  titles.add(title);
  for (const selector of ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:image"]', 'meta[name="twitter:card"]']) assert.ok($(selector).attr('content'), `${selector}: ${route(file)}`);
  assert.equal($('link[rel="canonical"]').attr('href'), site + (route(file) === '/404.html' ? '/404/' : route(file)));
  assert.ok($('meta[name="robots"]').attr('content')?.includes('noindex'), 'Redesign preview must remain noindex');
  assert.equal($('iframe').length, 0, 'Third-party iframes must be click-to-load');
  const ids = $('[id]').toArray().map(element => $(element).attr('id'));
  assert.equal(ids.length, new Set(ids).size, `Duplicate IDs on ${route(file)}`);
  for (const element of $('[href], [src]').toArray()) {
    if ($(element).attr('rel') === 'canonical' && route(file) === '/404.html') continue;
    for (const attribute of ['href', 'src']) if ($(element).attr(attribute)) localTarget($(element).attr(attribute), file);
  }
  localTarget($('meta[property="og:image"]').attr('content'), file);
  for (const element of $('img').toArray()) {
    const image = $(element);
    assert.ok(image.attr('alt')?.trim(), `Missing meaningful alt: ${route(file)}`);
    assert.ok(Number(image.attr('width')) > 0 && Number(image.attr('height')) > 0, `Missing dimensions: ${route(file)}`);
    if (image.attr('srcset')) for (const candidate of image.attr('srcset').split(',')) localTarget(candidate.trim().split(/\s+/)[0], file);
  }
  for (const element of $('script[type="application/ld+json"]').toArray()) assert.equal(JSON.parse($(element).text())['@type'], 'Person');
}
for (const file of files.filter(file => file.endsWith('.css'))) {
  const css = readFileSync(file, 'utf8');
  for (const match of css.matchAll(/url\(["']?([^\s"')]+)["']?\)/g)) {
    if (/^(data:|https?:)/.test(match[1])) continue;
    const target = match[1].startsWith('/') ? resolve(root, '.' + match[1]) : resolve(dirname(file), match[1]);
    assert.ok(existsSync(target), `Missing CSS asset ${match[1]}`);
    references++;
  }
}
assert.ok(existsSync(resolve(root, 'robots.txt')));
assert.ok(existsSync(resolve(root, 'sitemap.xml')));
assert.ok(!files.some(file => /(?:MASTER_PROMPT|portfolio_catalog|\.dae$|\.skp$|\.env)/.test(relative(root, file))), 'Private/build-source artifacts leaked');
console.log(`PASS: ${html.length} HTML pages; ${references} local link/image/font references; metadata, IDs, alt text, dimensions, noindex and deferred embeds.`);
