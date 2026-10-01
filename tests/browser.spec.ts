import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync } from 'node:fs';

const projects = readdirSync('dist/projects', { withFileTypes:true }).filter(entry => entry.isDirectory()).map(entry => `/projects/${entry.name}/`);
const routes = ['/', '/work/', '/research/', '/about/', '/music/', '/404.html', ...projects];
const spotify = [
  'https://open.spotify.com/embed/artist/1IwLCTxeQ2AAlT0Uu3l3SK?utm_source=generator&theme=0&si=ebf30ef4ec15466b',
  'https://open.spotify.com/embed/artist/0kw8rWYvTsKrtCRF0vYlMx?utm_source=generator&theme=0&si=21dc2c58cb9a40e9',
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
    if (route.startsWith('/projects/')) await expect(page.locator('.project-hero figcaption')).toHaveCount(0);
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
      for (const image of await page.locator('img:visible').all()) {
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
  await expect(page.locator('main a[href="https://skfb.ly/pNUVq"]').first()).toBeVisible();
  await expect(page.locator('iframe')).toHaveCount(0);
  for (const [slug, count] of [['prague-squared',4],['beyond-the-horizon',8],['joyplot',6]] as const) {
    await page.goto(`http://127.0.0.1:4321/projects/${slug}/`);
    const gallery = page.locator('[data-presentation-gallery]');
    await expect(gallery.locator('[data-gallery-slide]:visible')).toHaveCount(1);
    await expect(gallery.locator('[data-gallery-controls]')).toBeHidden();
    await expect(gallery.locator('noscript a')).toHaveCount(count);
    for (const link of await gallery.locator('noscript a').all()) {
      const response = await context.request.get((await link.getAttribute('href'))!.startsWith('/') ? 'http://127.0.0.1:4321' + await link.getAttribute('href') : (await link.getAttribute('href'))!);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toMatch(/^image\//);
    }
  }
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
  await expect(page.getByText('Maps, music & models', {exact:true})).toHaveCount(0);
  await page.goto('/research/');
  await expect(page.locator('.page-intro')).toHaveText('Research.');
  expect(await page.locator('[data-project]').evaluateAll(elements => elements.map(element => element.getAttribute('data-project')))).toEqual(['bivariate-joyplot','prague-squared','beyond-the-horizon','vltava-ii','two-centuries-of-railways']);
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
  await expect(page.locator('.project-hero figcaption')).toHaveCount(0);
  await expect(page.locator('.project-hero img')).toHaveAttribute('src',/\/joy[._]/);
  await expect(page.locator('[data-presentation-gallery]')).toHaveCount(1);
  await expect(page.locator('[data-gallery-slide] img[src*="/joy."]')).toHaveCount(0);
  await expect(page.locator('[data-gallery-slide]').nth(3).locator('img')).toHaveAttribute('alt','White elevation ridgelines trace Martinique on a lavender background.');
});

test('About preserves exactly the practice blocks and Connect links in responsive order', async ({page}) => {
  const blocks = [
    ['Cartography & visualization','Thematic mapping, information graphics and experimental visual methods.'],
    ['Research & storytelling','Historical sources, spatial analysis and interactive narratives.'],
    ['Education','Teaching-related cartography, GIS and spatial data visualization.'],
  ];
  await page.goto('/about/');
  await expect(page.locator('.page-intro')).toHaveText('About.');
  await expect(page.locator('main p')).toHaveText(blocks.map(block => block[1]));
  await expect(page.locator('main a')).toHaveCount(3);
  const links = await page.locator('main a').evaluateAll(elements => elements.map(element => element.getAttribute('href')));
  expect(links).toEqual(['mailto:josef.munzberger@fsv.cvut.cz','https://geomatics.fsv.cvut.cz/employees/josef-munzberger/','https://www.linkedin.com/in/josef-m%C3%BCnzberger-a71a29204/']);
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

test('Music contains approved intro and exact FINAL artist Spotify players', async ({page}) => {
  await page.goto('/music/');
  await expect(page.locator('main h1')).toHaveText('Music.');
  await expect(page.locator('main p')).toHaveText("I'm a lifelong musician, playing in The Jay and Asibásně, composing music for theatre productions, and a member of Činoherní klub since 2022 as a sound engineer.");
  await expect(page.locator('main u')).toHaveText(['The Jay','Asibásně','Činoherní klub']);
  await expect(page.locator('main a')).toHaveCount(1);
  await expect(page.locator('main a')).toHaveAttribute('href','https://cinoherniklub.cz/lide/josef-munzberger/');
  const frames = page.locator('iframe');
  await expect(frames).toHaveCount(2);
  for (let index=0;index<2;index++) {
    await expect(frames.nth(index)).toHaveAttribute('src',spotify[index]);
    await expect(frames.nth(index)).toHaveAttribute('title',index === 0 ? /The Jay/ : /Asibásně/);
    await expect(frames.nth(index)).toHaveAttribute('data-testid','embed-iframe');
    await expect(frames.nth(index)).toHaveAttribute('allowfullscreen','');
    expect(await frames.nth(index).evaluate(element => getComputedStyle(element).borderRadius)).toBe('12px');
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

for (const [slug, names] of [
  ['prague-squared',['ps1','ps2','ps3','ps5']],
  ['beyond-the-horizon',['C_overview','C_detail','C_detail2','D_overview','D_detail','E_overview','E_detail','S_overview']],
  ['joyplot',['JoyDominica','JoyGrenada','JoyGuadeloupe','JoyMartinique','JoyStLucia','JoyStVincent']],
] as const) {
  test(`presentation gallery finite keyboard controls and exact map order: ${slug}`, async ({page}) => {
    await page.goto(`/projects/${slug}/`);
    const gallery = page.locator('[data-presentation-gallery]');
    const slides = gallery.locator('[data-gallery-slide]');
    const previous = gallery.locator('[data-gallery-prev]');
    const next = gallery.locator('[data-gallery-next]');
    const counter = gallery.locator('[data-gallery-counter]');
    await expect(gallery).toHaveCount(1);
    await expect(slides).toHaveCount(names.length);
    for (let index=0;index<names.length;index++) {
      const image = slides.nth(index).locator('img');
      await expect(image).toHaveAttribute('src',new RegExp(`${names[index]}[._]`));
      await expect(image).toHaveAttribute('alt',/\S+/);
      expect(await image.evaluate(element => getComputedStyle(element).objectFit)).toBe('contain');
    }
    await expect(gallery.locator('[data-gallery-slide]:visible')).toHaveCount(1);
    await expect(slides.first()).toBeVisible();
    await expect(previous).toBeDisabled();
    await expect(counter).toHaveText(`1 / ${names.length}`);
    for (let index=0;index<names.length;index++) {
      const image = slides.nth(index).locator('img');
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
      await image.evaluate((element: HTMLImageElement) => element.decode());
      if (index < names.length-1) await next.click();
    }
    await gallery.focus();
    await page.keyboard.press('Home');
    await next.click();
    await expect(slides.nth(1)).toBeVisible();
    await expect(counter).toHaveText(`2 / ${names.length}`);
    for (let index=2; index<names.length; index++) await next.click();
    await expect(gallery).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expect(counter).toHaveText(`${names.length - 1} / ${names.length}`);
    await page.keyboard.press('Home');
    await next.click();
    await gallery.focus();
    await page.keyboard.press('ArrowRight');
    await expect(slides.nth(2)).toBeVisible();
    await page.keyboard.press('ArrowLeft');
    await expect(slides.nth(1)).toBeVisible();
    await page.keyboard.press('End');
    await expect(slides.last()).toBeVisible();
    await expect(next).toBeDisabled();
    await page.keyboard.press('ArrowRight');
    await expect(slides.last()).toBeVisible();
    await page.keyboard.press('Home');
    await expect(slides.first()).toBeVisible();
    await expect(previous).toBeDisabled();
    await page.keyboard.press('ArrowLeft');
    await expect(slides.first()).toBeVisible();
    // No timer-driven slide advance, even after a typical carousel interval.
    await page.waitForTimeout(5500);
    await expect(counter).toHaveText(`1 / ${names.length}`);
    await expect(gallery.locator('[data-gallery-slide]:visible')).toHaveCount(1);
    await page.setViewportSize({width:320,height:900});
    await next.click();
    await expect(slides.nth(1)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(321);
  });
}

test('Round 3 publication links and requested metadata removals', async ({page}) => {
  await page.goto('/projects/prague-squared/');
  await expect(page.locator('.project-meta')).not.toContainText('Location');
  await expect(page.getByRole('link',{name:'Runner-up — Best Map Award 2025, Journal of Maps',exact:false})).toHaveAttribute('href','https://www.tandfonline.com/journals/tjom20/collections/best-map-award');
  await page.goto('/projects/bivariate-joyplot/');
  await expect(page.getByRole('link',{name:'Bivariate Joy Plots User Study',exact:false})).toHaveAttribute('href','https://joyplots.onmaps.cz/');
  await expect(page.getByText('User-testing study comparing bivariate joy plots with bivariate choropleth maps.',{exact:true})).toBeVisible();
  await page.goto('/projects/dantes-inferno/');
  await expect(page.getByText('Featured in Esri Press books',{exact:true})).toBeVisible();
  await expect(page.getByRole('link',{name:'Telling Stories with Maps',exact:false})).toHaveAttribute('href','https://www.esri.com/en-us/esri-press/browse/telling-stories-with-maps');
  await expect(page.getByRole('link',{name:'The Spatial Edge',exact:false})).toHaveAttribute('href','https://www.esri.com/en-us/esri-press/browse/the-spatial-edge');
  for (const [slug, subtitle] of [
    ['tropical-nights','Thematic cartography / climate data visualization'],
    ['elton-john-tour','Thematic cartography / music mapping'],
    ['chinese-pavilion-cibulka','3D modelling'],
    ['beyond-the-horizon','Travel networks / Digital Humanities / HGIS'],
    ['vltava-ii','Digital storytelling'],
    ['two-centuries-of-railways','Digital storytelling'],
  ]) {
    await page.goto(`/projects/${slug}/`);
    await expect(page.locator('.project-intro > p')).toHaveText(subtitle);
    if (['beyond-the-horizon','vltava-ii','two-centuries-of-railways'].includes(slug)) await expect(page.locator('.project-meta')).not.toContainText('Funding');
    if (['tropical-nights','beyond-the-horizon'].includes(slug)) await expect(page.getByRole('heading',{name:'Sources & Credits'})).toHaveCount(0);
    if (slug === 'elton-john-tour') {
      await expect(page.getByRole('heading',{name:'Teaching context'})).toHaveCount(0);
      await expect(page.locator('main')).not.toContainText('The teaching exercise asks students');
      await expect(page.locator('main')).toContainText('The map animation was developed while preparing a university cartography practical on geocoding.');
    }
    if (slug === 'chinese-pavilion-cibulka') {
      await expect(page.locator('h1')).toHaveText('Chinese Pavilion');
      await expect(page.locator('main')).not.toContainText('Loading the viewer');
    }
  }
});
