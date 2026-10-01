import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';

const argument = process.argv.indexOf('--base');
const base = new URL(argument < 0 ? 'https://munzbjos.github.io/' : process.argv[argument + 1]);
const canonicalBase = 'https://munzbjos.github.io';
const slugs = ['prague-squared','joyplot','dantes-inferno','tropical-nights','the-beatles-map','elton-john-tour','chinese-pavilion-cibulka','bivariate-joyplot','beyond-the-horizon','vltava-ii','two-centuries-of-railways'];
const routes = ['/', '/work/', '/research/', '/about/', '/music/', ...slugs.map(slug => `/projects/${slug}/`)];
const galleries = { 'prague-squared':['ps1','ps2','ps3','ps5'], joyplot:['JoyDominica','JoyGrenada','JoyGuadeloupe','JoyMartinique','JoyStLucia','JoyStVincent'], 'beyond-the-horizon':['C_overview','C_detail','C_detail2','D_overview','D_detail','E_overview','E_detail','S_overview'] };
const spotify = ['https://open.spotify.com/embed/artist/1IwLCTxeQ2AAlT0Uu3l3SK?utm_source=generator&theme=0&si=ebf30ef4ec15466b','https://open.spotify.com/embed/artist/0kw8rWYvTsKrtCRF0vYlMx?utm_source=generator&theme=0&si=21dc2c58cb9a40e9'];
const report = { startedAt:new Date().toISOString(), base:base.href, pages:[], galleries:[], externals:[], warnings:[], errors:[], limitations:['GET-only network policy may prevent third-party player internals from working. No audio playback attempted.', 'External cross-origin application rendering and publication access are not guaranteed by successful HTTP responses.'] };
const externalLinks = new Set();
const check = (condition, message) => { if (!condition) throw new Error(message); };
const url = path => new URL(path, base).href;
const chrome = '/home/maia/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome';
mkdirSync('qa-artifacts', {recursive:true});
const browser = await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (existsSync(chrome) ? chrome : undefined)});
const context = await browser.newContext();
// Never submit forms, analytics POSTs or participant/session creation requests.
await context.route('**/*', route => route.request().method() === 'GET' ? route.continue() : route.abort());
const page = await context.newPage();
page.setDefaultTimeout(12000);
const safe = async (name, task) => {
  console.log(name);
  try { await task(); } catch(error) { report.errors.push(`${name}: ${error.message}`); console.error(error.message); }
};
async function get(path) {
  return context.request.get(url(path), {timeout:20000});
}
async function decodeVisible() {
  for (const image of await page.locator('img:visible').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(async image => { await image.decode(); if (!image.naturalWidth) throw new Error('Empty image'); });
  }
}
try {
  for (const width of [1440,390]) {
    await page.setViewportSize({width,height:1000});
    for (const path of [...routes,'/404.html']) await safe(`${width}px ${path}`, async () => {
      const response = await page.goto(url(path), {waitUntil:'domcontentloaded',timeout:25000});
      check(response?.status() === 200, `HTTP ${response?.status()}`);
      await page.evaluate(() => document.fonts.ready);
      check(await page.locator('h1').count() === 1, 'Expected one h1');
      check(await page.locator('link[rel="canonical"]').getAttribute('href') === canonicalBase + path, 'Incorrect canonical');
      const robots = await page.locator('meta[name="robots"]').getAttribute('content');
      check(robots === (path === '/404.html' ? 'noindex,follow' : 'index,follow'), `Unexpected robots: ${robots}`);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth+1), 'Horizontal overflow');
      await decodeVisible();
      for (const href of await page.locator('a[href^="https://"]').evaluateAll(elements => elements.map(element => element.href))) if (new URL(href).origin !== base.origin) externalLinks.add(href);
      report.pages.push({path,width,status:response.status(),pass:true});
    });
    await safe(`${width}px header navigation`, async () => {
      for (const label of ['Work','Research','About','Music']) {
        await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:label,exact:true}).click();
        check(new URL(page.url()).pathname === `/${label.toLowerCase()}/`, `Navigation failed: ${label}`);
      }
    });
  }
  for (const width of [1440,390]) for (const [slug,names] of Object.entries(galleries)) await safe(`Gallery ${slug} ${width}px`, async () => {
    await page.setViewportSize({width,height:1000});
    await page.goto(url(`/projects/${slug}/`), {waitUntil:'domcontentloaded'});
    const gallery = page.locator('[data-presentation-gallery]');
    const slides = gallery.locator('[data-gallery-slide]');
    check(await slides.count() === names.length, 'Incorrect slide count');
    for (let index=0;index<names.length;index++) {
      const source = await slides.nth(index).locator('img').getAttribute('src');
      check(new RegExp(`${names[index]}[._]`).test(source), `Wrong image ${index}: ${source}`);
      check(await gallery.locator('[data-gallery-slide]:visible').count() === 1, 'Multiple slides visible');
      await slides.nth(index).locator('img').scrollIntoViewIfNeeded();
      await slides.nth(index).locator('img').evaluate(image => image.decode());
      if(index<names.length-1) await gallery.locator('[data-gallery-next]').click();
    }
    check(await gallery.locator('[data-gallery-next]').isDisabled(), 'Next should be disabled at end');
    await gallery.focus();
    await page.keyboard.press('Home');
    check(await slides.first().isVisible(), 'Home failed');
    await page.keyboard.press('End');
    check(await slides.last().isVisible(), 'End failed');
    await gallery.locator('[data-gallery-prev]').click();
    check(await slides.nth(names.length-2).isVisible(), 'Previous failed');
    report.galleries.push({slug,width,count:names.length,pass:true});
  });
  await safe('Robots and sitemap', async () => {
    const robots = await get('/robots.txt');
    check(robots.status() === 200, 'robots HTTP status');
    const text = await robots.text();
    check(/^Allow:\s*\/$/m.test(text) && !/^Disallow:\s*\/$/m.test(text), 'robots blocks indexing');
    check(text.includes(`${canonicalBase}/sitemap.xml`), 'Missing sitemap directive');
    const sitemap = await get('/sitemap.xml');
    check(sitemap.status() === 200, 'sitemap HTTP status');
    const locations = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
    check(JSON.stringify(locations.sort()) === JSON.stringify(routes.map(path=>canonicalBase+path).sort()), 'Sitemap must contain exactly 16 canonical content URLs');
  });
  await safe('Custom 404 and excluded source paths', async () => {
    for (const path of ['/__read_only_smoke_missing__/', '/joy.png','/js/','/portfolio/','/docs/MASTER_PROMPT_REDESIGN.md','/MASTER_PROMPT_REDESIGN.md','/package.json','/src/']) {
      const response = await get(path);
      check(response.status() === 404, `${path} returned ${response.status()}`);
      if(path === '/__read_only_smoke_missing__/') check((await response.text()).includes('Back to the portfolio'), 'Custom 404 missing');
    }
  });
  await safe('Live Spotify artist frames (no playback)', async () => {
    await page.goto(url('/music/'), {waitUntil:'domcontentloaded'});
    await page.setViewportSize({width:390,height:1600});
    const frames = page.locator('iframe');
    check(await frames.count() === 2, 'Expected two players');
    for(let index=0;index<2;index++) {
      check(await frames.nth(index).getAttribute('src') === spotify[index], 'Wrong artist embed URL');
      await frames.nth(index).scrollIntoViewIfNeeded();
      const response = await context.request.get(spotify[index], {timeout:20000});
      const html = await response.text();
      report.externals.push({url:spotify[index],status:response.status(),artistTextPresent:html.includes(index === 0 ? 'The Jay' : 'Asibásně')});
      check(response.status() === 200, `Spotify ${index+1} HTTP ${response.status()}`);
      const liveFrame = await (await frames.nth(index).elementHandle()).contentFrame();
      await liveFrame.waitForFunction(name => document.body?.innerText.includes(name), index === 0 ? 'The Jay' : 'Asibásně', {timeout:30000});
      report.externals.at(-1).renderedText = (await liveFrame.locator('body').innerText()).slice(0,500);
    }
    await page.screenshot({path:'qa-artifacts/live-music.png',fullPage:true});
  });
  await safe('Sketchfab activation', async () => {
    await page.goto(url('/projects/chinese-pavilion-cibulka/'), {waitUntil:'domcontentloaded'});
    const embed = 'https://sketchfab.com/models/191490ecadc94a66aa4afa840d8d96b0/embed';
    const responsePromise = page.waitForResponse(response=>response.url() === embed, {timeout:20000}).catch(()=>null);
    await page.getByRole('button',{name:/Load interactive 3D model/}).click();
    const frame = page.locator('iframe');
    check(await frame.getAttribute('src') === embed, 'Wrong Sketchfab URL');
    check(await frame.evaluate(element=>document.activeElement === element), 'Iframe not focused');
    const response = await responsePromise;
    report.externals.push({url:embed,status:response?.status() ?? null});
    check(response?.status() === 200, `Sketchfab embed HTTP ${response?.status() ?? 'timeout'}`);
  });
  console.log(`Checking ${externalLinks.size} external links (warnings only)`);
  const queue = [...externalLinks];
  await Promise.all(Array.from({length:4}, async () => {
    while(queue.length) {
      const href = queue.shift();
      try {
        const response = await context.request.get(href,{timeout:15000});
        report.externals.push({url:href,status:response.status()});
        if(response.status() >= 400) report.warnings.push(`${href}: HTTP ${response.status()}`);
      } catch(error) { report.warnings.push(`${href}: ${error.message.split('\n')[0]}`); }
    }
  }));
} finally {
  report.finishedAt = new Date().toISOString();
  report.pass = report.errors.length === 0;
  writeFileSync('qa-artifacts/live-smoke.json', JSON.stringify(report,null,2)+'\n');
  await browser.close();
}
console.log(`${report.pass ? 'PASS' : 'FAIL'}: ${report.pages.length} page/viewport checks; ${report.galleries.length} galleries; ${report.errors.length} errors; ${report.warnings.length} external warnings. Report: qa-artifacts/live-smoke.json`);
if(!report.pass) process.exitCode = 1;
