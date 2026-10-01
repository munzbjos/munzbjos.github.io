export function GET() {
  const indexable = import.meta.env.PUBLIC_INDEXABLE === 'true';
  return new Response(`User-agent: *\n${indexable ? 'Allow: /' : 'Disallow: /'}\nSitemap: https://munzbjos.github.io/sitemap.xml\n`, {headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
