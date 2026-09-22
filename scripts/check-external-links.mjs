import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { load } from 'cheerio';

async function htmlFiles(dir) {
  const entries = await readdir(dir, {withFileTypes:true});
  return (await Promise.all(entries.map(e => e.isDirectory() ? htmlFiles(join(dir,e.name)) : e.name.endsWith('.html') ? [join(dir,e.name)] : []))).flat();
}
const urls = new Set();
for (const file of await htmlFiles('dist')) {
  const $ = load(await readFile(file, 'utf8'));
  $('a[href^="https://"]').each((_, el) => urls.add($(el).attr('href')));
}
const results = [];
const queue = [...urls];
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    try {
      const response = await fetch(url, {signal:AbortSignal.timeout(25000),headers:{'User-Agent':'Portfolio-Link-QA/1.0'}});
      results.push({url,status:response.status,finalURL:response.url});
      await response.body?.cancel();
    } catch (error) { results.push({url,status:'unverified',error:error.message}); }
  }
}
await Promise.all(Array.from({length:4},worker));
results.sort((a,b)=>a.url.localeCompare(b.url));
await mkdir('qa-artifacts',{recursive:true});
await writeFile('qa-artifacts/external-links.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
// Remote blocks/timeouts are explicitly reported, not silently classified as broken URLs.
