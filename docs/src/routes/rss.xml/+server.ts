import { changelog } from "$content/index.js";
import { siteConfig } from "$lib/config.js";

export const prerender = true;

export function GET() {
	// Sort descending by slug (YYYY-MM-* prefix gives us date order)
	const entries = [...changelog].sort((a, b) => b.slug.localeCompare(a.slug));

	const items = entries
		.map((entry) => {
			// Parse YYYY-MM from slug like "changelog/2025-06-calendar"
			const match = entry.slug.match(/(\d{4})-(\d{2})/);
			const pubDate = match
				? new Date(Number(match[1]), Number(match[2]) - 1, 1).toUTCString()
				: new Date().toUTCString();
			const link = `${siteConfig.url}/docs/${entry.slug}`;
			return `    <item>
      <title><![CDATA[${entry.title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <description><![CDATA[${entry.description ?? ""}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
		})
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} Changelog</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
}
