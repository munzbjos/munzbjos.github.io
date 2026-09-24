import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import sharp from 'sharp';

const root = resolve('docs/review');
const manifest = JSON.parse(await readFile(resolve(root, 'manifest.json'), 'utf8'));
assert.equal(manifest.iteration, 2);
assert.equal(manifest.screenshots.length, 48);
assert.equal(manifest.cards.length, 22);
assert.equal(new Set(manifest.screenshots.map(s => s.route)).size, 16);
for (const width of [1440,768,390]) assert.equal(manifest.screenshots.filter(s => s.width === width).length, 16);
for (const viewport of ['desktop','mobile']) {
  const cards = manifest.cards.filter(c => c.viewport === viewport);
  assert.equal(cards.length, 11);
  assert.equal(new Set(cards.map(c => c.slug)).size, 11);
  for (const card of cards) assert.ok(card.title && card.label && card.year && card.listingRoute);
}
const expected = new Set([...manifest.screenshots, ...manifest.cards].map(s => resolve(root,s.file)));
for (const screenshot of [...manifest.screenshots, ...manifest.cards]) {
  const metadata = await sharp(resolve(root, screenshot.file)).metadata();
  assert.equal(metadata.format, 'png');
  assert.equal(metadata.width, screenshot.width, screenshot.file);
  assert.equal(metadata.height, screenshot.height, screenshot.file);
}
let links = 0;
let pngs = 0;
async function checkDirectory(dir) {
  for (const entry of await readdir(dir, {withFileTypes:true})) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) await checkDirectory(path);
    else if (entry.name.endsWith('.png')) { assert.ok(expected.has(path), `Stale screenshot: ${path}`); pngs++; }
    else if (entry.name.endsWith('.md')) {
      const content = await readFile(path, 'utf8');
      for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
        if (/^https?:/.test(match[1])) continue;
        await access(resolve(dirname(path), match[1]));
        links++;
      }
    }
  }
}
await checkDirectory(root);
assert.equal(pngs, 70);
assert.equal(manifest.externalEmbeds.length, 6);
for (const embed of manifest.externalEmbeds) assert.match(embed.visibleText, /Caroline|Pojď se mnou ven/);
console.log(`PASS: ${pngs} PNGs (48 pages + 22 cards), exact dimensions, all11 cards at both widths, 6 live Spotify renders, ${links} valid Markdown references.`);
