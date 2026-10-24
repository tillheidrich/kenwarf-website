import { inhalt } from '../inhalt';
export const GET = () => new Response(inhalt.noindex ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${inhalt.domain}/sitemap.xml\n`, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
