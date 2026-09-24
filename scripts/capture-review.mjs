// Capture the built site, never the Astro development server or public production.
import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const base = 'http://127.0.0.1:4321';
const output = 'docs/review';
const routes = [
  ['01-home', 'Home', '/'],
  ['02-work', 'Work', '/work/'],
  ['03-research', 'Research', '/research/'],
  ['04-about', 'About', '/about/'],
  ['05-music', 'Music', '/music/'],
  ['06-prague-squared', 'Prague Squared', '/projects/prague-squared/'],
  ['07-joy-plots', 'Joy Plots', '/projects/joyplot/'],
  ['08-bivariate-joy-plots', 'Bivariate Joy Plots', '/projects/bivariate-joyplot/'],
  ['09-dantes-inferno', 'Dante’s Inferno', '/projects/dantes-inferno/'],
  ['10-tropical-nights', 'Tropical Nights', '/projects/tropical-nights/'],
  ['11-the-beatles-map', 'The Beatles Map', '/projects/the-beatles-map/'],
  ['12-elton-john-tour', 'Elton John – Farewell Yellow Brick Road Tour', '/projects/elton-john-tour/'],
  ['13-chinese-pavilion-cibulka', 'Chinese Pavilion at Cibulka', '/projects/chinese-pavilion-cibulka/'],
  ['14-beyond-the-horizon', 'Beyond the Horizon', '/projects/beyond-the-horizon/'],
  ['15-chain-bridge', 'The Second Life of the Chain Bridge', '/projects/vltava-ii/'],
  ['16-lost-railway', 'Tracing the Lost Railway', '/projects/two-centuries-of-railways/'],
];
const cardRoutes = [
  ['/work/', ['prague-squared', 'joyplot', 'dantes-inferno', 'tropical-nights', 'the-beatles-map', 'elton-john-tour', 'chinese-pavilion-cibulka']],
  ['/research/', ['bivariate-joyplot', 'beyond-the-horizon', 'vltava-ii', 'two-centuries-of-railways']],
];
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];
const sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const localChrome = '/home/maia/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome';
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (existsSync(localChrome) ? localChrome : undefined),
  headless: true,
});
const sourceWorkingTreeModified = execFileSync('git', ['diff', 'HEAD', '--', 'src', 'public', 'astro.config.mjs', 'package.json', 'package-lock.json'], {encoding:'utf8'}).length > 0;
const manifest = { iteration: 2, sourceCommit, sourceWorkingTreeModified, capturedAt: new Date().toISOString(), browser: browser.version(), deviceScaleFactor: 1, screenshots: [], cards: [], externalEmbeds: [] };

async function ready(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Eager loading only, no CSS changes, crop changes, or source-image edits.
    for (const image of document.images) image.loading = 'eager';
    await Promise.all([...document.images].map(image => image.decode()));
  });
  await page.mouse.move(0, 0);
}

async function loadSpotify(page, viewport) {
  for (const iframe of await page.locator('.music-players iframe').all()) {
    await iframe.scrollIntoViewIfNeeded();
    const src = await iframe.getAttribute('src');
    const handle = await iframe.elementHandle();
    let frame;
    // Loading=lazy intentionally delays the second player until brought into view.
    for (let attempt = 0; attempt < 60; attempt++) {
      frame = await handle.contentFrame();
      if (frame?.url().startsWith('https://open.spotify.com/embed/')) break;
      await page.waitForTimeout(500);
    }
    if (!frame?.url().startsWith('https://open.spotify.com/embed/')) throw new Error(`Spotify frame did not load: ${src}`);
    await frame.waitForLoadState('domcontentloaded');
    await frame.waitForFunction(() => document.body.innerText.trim().length > 20, {timeout:30000});
    await frame.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
    });
    // Preserve what the live service really rendered, including any service error.
    manifest.externalEmbeds.push({viewport:viewport.name,src,visibleText:(await frame.locator('body').innerText()).slice(0,1600)});
  }
}
try {
  for (const viewport of viewports) {
    await mkdir(`${output}/${viewport.name}`, { recursive: true });
    const context = await browser.newContext({ viewport: {width: viewport.width, height: viewport.height}, deviceScaleFactor: 1, colorScheme: 'light' });
    const page = await context.newPage();
    const errors = [];
    let currentPath = '';
    page.on('pageerror', error => { if (currentPath !== '/music/') errors.push(error.message); });
    // Music is intentionally the only page with live third-party embeds in CR2.
    await page.route('**/*', route => new URL(route.request().url()).origin === base || currentPath === '/music/' ? route.continue() : route.abort());
    for (const [slug, title, path] of routes) {
      currentPath = path;
      const response = await page.goto(base + path, { waitUntil: 'load' });
      if (response.status() !== 200) throw new Error(`${path}: HTTP ${response.status()}`);
      await ready(page);
      if (path === '/music/') await loadSpotify(page, viewport);
      await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const size = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight }));
      if (size.scrollWidth > viewport.width) throw new Error(`${path}: horizontal overflow ${size.scrollWidth}`);
      const file = `${viewport.name}/${slug}.png`;
      await page.screenshot({ path: `${output}/${file}`, fullPage: true, animations: 'disabled' });
      const metadata = await sharp(`${output}/${file}`).metadata();
      if (metadata.width !== viewport.width || metadata.height < size.height) throw new Error(`Invalid screenshot dimensions: ${file}`);
      manifest.screenshots.push({ title, route: path, file, width: metadata.width, height: metadata.height });
      console.log(`${file}: ${metadata.width} × ${metadata.height}`);
    }
    if (viewport.name !== 'tablet') {
      await mkdir(`${output}/cards/${viewport.name}`, { recursive: true });
      for (const [path, slugs] of cardRoutes) {
        currentPath = path;
        await page.goto(base + path, {waitUntil:'load'});
        await ready(page);
        for (const slug of slugs) {
          const card = page.locator(`.project-card[data-project="${slug}"]`);
          const file = `cards/${viewport.name}/${slug}.png`;
          await card.screenshot({path:`${output}/${file}`,animations:'disabled'});
          const metadata = await sharp(`${output}/${file}`).metadata();
          const title = await card.locator('.card-title').innerText();
          const label = await card.locator('.card-meta span').first().innerText();
          const year = await card.locator('.card-meta span').last().innerText();
          manifest.cards.push({slug,title:title.replace(/\s*↗\s*$/,''),label,year,listingRoute:path,viewport:viewport.name,viewportWidth:viewport.width,file,width:metadata.width,height:metadata.height});
          console.log(`${file}: ${metadata.width} × ${metadata.height}`);
        }
      }
    }
    if (errors.length) throw new Error(errors.join('\n'));
    await context.close();
  }
  if (manifest.screenshots.length !== 48 || manifest.cards.length !== 22) throw new Error('Incomplete review package');
  await writeFile(`${output}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
} finally {
  await browser.close();
}
