import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync } from 'node:fs';

const projects = readdirSync('dist/projects', { withFileTypes:true }).filter(entry => entry.isDirectory()).map(entry => `/projects/${entry.name}/`);
const routes = ['/', '/work/', '/research/', '/about/', '/music/', '/404.html', ...projects];

for (const route of routes) {
  test(`accessible and entirely local before interaction: ${route}`, async ({ page }) => {
    const external: string[] = [];
    const errors: string[] = [];
    page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4321/') && !request.url().startsWith('data:')) external.push(request.url()); });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('iframe')).toHaveCount(0);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    expect(results.violations).toEqual([]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
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
