import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync } from 'node:fs';

const projects = readdirSync('dist/projects', { withFileTypes:true }).filter(entry => entry.isDirectory()).map(entry => `/projects/${entry.name}/`);
const routes = ['/', '/work/', '/research/', '/about/', '/music/', '/404.html', ...projects];
const spotify = [
  'https://open.spotify.com/embed/album/0Zgc4sdQv3ArYMS955r1FE?utm_source=generator&theme=0&si=1bc37425d8a34eca',
  'https://open.spotify.com/embed/track/4r9UAO3vFwWMuy3Fo0jkQq?utm_source=generator&theme=0&si=2cf82103b97a40be',
];
// Deterministic host-page QA only; actual Spotify playback/live rendering is a
// separate manual check. We do not claim to audit Spotify's cross-origin UI.
const spotifyPlaceholder = '<!doctype html><html lang="en"><head><title>Spotify QA placeholder</title></head><body><main><h1>Spotify QA placeholder</h1></main></body></html>';
test.beforeEach(async ({page}) => {
  await page.route('https://open.spotify.com/**', route => route.fulfill({status:200,contentType:'text/html',body:spotifyPlaceholder}));
});

for (const route of routes) {
  test(`accessible and no unapproved external requests: ${route}`, async ({ page }) => {
    const external: string[] = [];
    const errors: string[] = [];
    page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4321/') && !request.url().startsWith('data:')) external.push(request.url()); });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('iframe')).toHaveCount(route === '/music/' ? 2 : 0);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    expect(results.violations).toEqual([]);
    expect(external.filter(url => route !== '/music/' || !spotify.includes(url))).toEqual([]);
    expect(errors).toEqual([]);
    await expect(page.locator('footer')).toHaveText('© 2026 Josef Münzberger');
    await expect(page.locator('footer a')).toHaveCount(0);
    for (const dot of await page.locator('.brand-dot, h1 span').all()) {
      if ((await dot.textContent())?.trim() !== '.') continue;
      expect(await dot.evaluate(element => getComputedStyle(element).color)).toBe(await dot.evaluate(element => getComputedStyle(element.parentElement!).color));
    }
  });
}

for (const width of [320,390,768,1440]) {
  test(`all 17 routes fit ${width}px and display loaded images`, async ({ page }) => {
    await page.setViewportSize({width,height:900});
    expect(routes).toHaveLength(17);
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({width:innerWidth,scroll:document.documentElement.scrollWidth}));
      expect(dimensions.scroll, route).toBeLessThanOrEqual(dimensions.width + 1);
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0), {message:`Image on ${route}`,timeout:10000}).toBe(true);
      }
    }
  });
}

test('keyboard skip link, navigation and visible focus', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', {name:'Skip to content'});
  await expect(skip).toBeFocused();
  expect(await skip.evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe('none');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await page.goto('/');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('navigation').getByRole('link', {name:'Work',exact:true})).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/work\/$/);
});

test('reduced motion suppresses animation and smooth scrolling', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  expect(await page.locator('html').evaluate(element => getComputedStyle(element).scrollBehavior)).toBe('auto');
  expect(await page.locator('.card-image img').first().evaluate(element => getComputedStyle(element).transitionDuration)).toBe('0s');
});

test('Sketchfab iframe is only created after keyboard activation', async ({page}) => {
  await page.route('https://sketchfab.com/**', route => route.fulfill({status:200,contentType:'text/html',body:'<html><body>Viewer request intercepted for local QA</body></html>'}));
  await page.goto('/projects/chinese-pavilion-cibulka/');
  await expect(page.locator('iframe')).toHaveCount(0);
  const button = page.getByRole('button', {name:/Load interactive 3D model/});
  await button.focus();
  await page.keyboard.press('Enter');
  const frame = page.locator('iframe');
  await expect(frame).toHaveAttribute('src', 'https://sketchfab.com/models/191490ecadc94a66aa4afa840d8d96b0/embed');
  await expect(frame).toHaveAttribute('title', /Chinese Pavilion/);
  await expect(frame).toBeFocused();
});

test('all routes and Sketchfab fallback work without JavaScript', async ({browser}) => {
  const context = await browser.newContext({javaScriptEnabled:false});
  await context.route('https://open.spotify.com/**', route => route.fulfill({status:200,contentType:'text/html',body:spotifyPlaceholder}));
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto('http://127.0.0.1:4321' + route);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByRole('navigation', {name:'Main navigation'}).getByRole('link')).toHaveCount(4);
  }
  await page.goto('http://127.0.0.1:4321/projects/chinese-pavilion-cibulka/');
  await expect(page.getByRole('button', {name:/Load interactive/})).toBeHidden();
  await expect(page.getByRole('link', {name:'View model on Sketchfab ↗'})).toBeVisible();
  await expect(page.locator('iframe')).toHaveCount(0);
  await context.close();
});

test('homepage retains projects but removes counts, eyebrow and About teaser', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('main > section')).toHaveCount(3);
  await expect(page.locator('#selected-work [data-project]')).toHaveCount(3);
  await expect(page.locator('section[aria-labelledby="research-heading"] [data-project]')).toHaveCount(3);
  await expect(page.getByRole('heading', {name:'Selected Work',exact:true})).toBeVisible();
  await expect(page.getByRole('heading', {name:'Selected Research',exact:true})).toBeVisible();
  await expect(page.getByRole('link', {name:'All work ↗',exact:true})).toBeVisible();
  await expect(page.getByRole('link', {name:'All research ↗',exact:true})).toBeVisible();
  await expect(page.locator('main')).not.toContainText('01—03');
  await expect(page.locator('main')).not.toContainText('Methods, histories, perspectives');
  await expect(page.locator('.about-teaser')).toHaveCount(0);
});

test('Work and Research have title-only intros and specific card labels', async ({page}) => {
  await page.goto('/work/');
  await expect(page.locator('.page-intro')).toHaveText('Work.');
  await expect(page.locator('[data-project="dantes-inferno"] .card-meta')).toContainText('Storymapping & Digital Humanities');
  await expect(page.getByText('Further explorations', {exact:true})).toBeVisible();
  await expect(page.getByText('Maps, music & models', {exact:true})).toBeVisible();
  await page.goto('/research/');
  await expect(page.locator('.page-intro')).toHaveText('Research.');
  await expect(page.locator('[data-project="beyond-the-horizon"] .card-meta')).toContainText('Travel networks');
  for (const [slug,title] of [['vltava-ii','The Second Life of the Chain Bridge'],['two-centuries-of-railways','Tracing the Lost Railway']]) {
    await expect(page.locator(`[data-project="${slug}"] .card-title`)).toContainText(title);
    await expect(page.locator(`[data-project="${slug}"] .card-meta`)).toContainText('Storymapping');
  }
});

test('reviewed details show exact label and hero/gallery changes', async ({page}) => {
  await page.goto('/projects/dantes-inferno/');
  await expect(page.locator('.project-intro > p')).toHaveText('Storymapping / Digital Humanities');
  await expect(page.getByRole('link', {name:'Dante’s Inferno StoryMap ↗',exact:true})).toHaveAttribute('href','https://storymaps.arcgis.com/stories/ad2a09720b75435b922396307e2d6004');
  await page.goto('/projects/joyplot/');
  await expect(page.locator('.project-hero img')).toHaveAttribute('alt','Overlapping ridge profiles map elevation and population across Czechia.');
  await expect(page.locator('.project-hero figcaption')).toContainText('Elevation / Population in Czechia');
  await expect(page.locator('.project-hero img')).toHaveAttribute('src',/\/joy[._]/);
  await expect(page.locator('.gallery figure').first().locator('img')).toHaveAttribute('alt','White elevation ridgelines trace Martinique on a lavender background.');
  await expect(page.locator('.gallery figure').first().locator('img')).toHaveAttribute('src',/JoyMartinique/);
  await expect(page.locator('.gallery figcaption')).toHaveText(['Martinique ↗','Dominica ↗','Grenada ↗']);
});

test('About preserves exactly the practice blocks and Connect links in responsive order', async ({page}) => {
  const blocks = [
    ['Cartography & visualization','Thematic mapping, information graphics and experimental visual methods.'],
    ['Research & storytelling','Historical sources, spatial analysis and interactive narratives.'],
    ['Education','Teaching-related cartography, geocoding and spatial data visualization.'],
  ];
  await page.goto('/about/');
  await expect(page.locator('.page-intro')).toHaveText('About.');
  await expect(page.locator('main p')).toHaveText(blocks.map(block => block[1]));
  await expect(page.locator('main a')).toHaveCount(4);
  const links = await page.locator('main a').evaluateAll(elements => elements.map(element => element.getAttribute('href')));
  expect(links).toEqual(['mailto:josef.munzberger@fsv.cvut.cz','https://geomatics.fsv.cvut.cz/employees/josef-munzberger/','https://www.linkedin.com/in/josef-m%C3%BCnzberger-a71a29204/','https://github.com/munzbjos']);
  const first = page.getByRole('heading', {name:blocks[0][0],exact:true});
  const connect = page.getByRole('heading', {name:'Connect',exact:true});
  for (const width of [1440,768]) {
    await page.setViewportSize({width,height:900});
    const a = (await first.boundingBox())!;
    const b = (await connect.boundingBox())!;
    expect(b.x).toBeGreaterThan(a.x + a.width);
    expect(Math.abs(a.y-b.y)).toBeLessThan(6);
  }
  await page.setViewportSize({width:390,height:900});
  expect((await connect.boundingBox())!.y).toBeGreaterThan((await page.getByText(blocks[2][1], {exact:true}).boundingBox())!.y);
});

test('Music contains only title and exact stacked lazy Spotify players', async ({page}) => {
  await page.goto('/music/');
  await expect(page.locator('main')).toHaveText('Music.');
  await expect(page.locator('main a, main button')).toHaveCount(0);
  const frames = page.locator('iframe');
  await expect(frames).toHaveCount(2);
  for (let index=0;index<2;index++) {
    await expect(frames.nth(index)).toHaveAttribute('src',spotify[index]);
    await expect(frames.nth(index)).toHaveAttribute('title',index === 0 ? /The Jay/ : /Asibásně/);
    for (const [attribute,value] of Object.entries({width:'100%',height:'352',loading:'lazy',frameborder:'0',allow:'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'})) await expect(frames.nth(index)).toHaveAttribute(attribute,value);
  }
  for (const width of [1440,768,390,320]) {
    await page.setViewportSize({width,height:900});
    const first = (await frames.nth(0).boundingBox())!;
    const second = (await frames.nth(1).boundingBox())!;
    expect(first.height).toBe(352);
    expect(second.height).toBe(352);
    expect(second.y).toBeGreaterThan(first.y+first.height);
    expect(first.x).toBeGreaterThan(0);
    expect(first.x+first.width).toBeLessThan(width);
  }
});
