import {projects} from '../data/projects';
export function GET() {
  const paths = ['','work/','research/','about/','music/',...projects.map(p=>`projects/${p.slug}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path=>`<url><loc>https://munzbjos.github.io/${path}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
