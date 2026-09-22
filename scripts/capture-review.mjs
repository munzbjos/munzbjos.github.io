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
const manifest = { sourceCommit, capturedAt: new Date().toISOString(), browser: browser.version(), deviceScaleFactor: 1, screenshots: [] };
try {
  for (const viewport of viewports) {
    await mkdir(`${output}/${viewport.name}`, { recursive: true });
    const context = await browser.newContext({ viewport: {width: viewport.width, height: viewport.height}, deviceScaleFactor: 1, colorScheme: 'light' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    for (const [slug, title, path] of routes) {
      const response = await page.goto(base + path, { waitUntil: 'networkidle' });
      if (response.status() !== 200) throw new Error(`${path}: HTTP ${response.status()}`);
      await page.evaluate(async () => {
        await document.fonts.ready;
        // Load all below-fold imagery without changing its styling or dimensions.
        for (const image of document.images) image.loading = 'eager';
        await Promise.all([...document.images].map(image => image.decode()));
        window.scrollTo(0, 0);
      });
      await page.mouse.move(0, 0);
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
    if (errors.length) throw new Error(errors.join('\n'));
    await context.close();
  }
  await writeFile(`${output}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
} finally {
  await browser.close();
}
