import { changelog } from "$content/index.js";
import { siteConfig } from "$lib/config.js";

export const prerender = true;

const RSS_PATH = "/rss.xml";

function cdata(value: string): string {
	return `<![CDATA[${value.replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;
}

function getDate(value: string | undefined): Date {
	if (!value) return new Date(0);

	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? new Date(0) : date;
}

export function GET() {
	const siteUrl = siteConfig.url;
	const items = changelog
		.filter((item) => item.path !== "changelog")
		.sort((a, b) => getDate(b.date).getTime() - getDate(a.date).getTime())
		.map((item) => {
			const url = `${siteUrl}/docs/${item.path}`;

			return `    <item>
      <title>${cdata(item.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${cdata(item.description)}</description>
      <pubDate>${getDate(item.date).toUTCString()}</pubDate>
    </item>`;
		})
		.join("\n");

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} Changelog</title>
    <link>${siteUrl}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}${RSS_PATH}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
}
