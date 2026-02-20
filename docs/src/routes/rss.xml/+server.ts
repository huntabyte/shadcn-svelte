import { changelog } from "$content/index.js";
import { siteConfig } from "$lib/config.js";

export const prerender = true;

function getChangelogDate(entry: (typeof changelog)[number]): Date {
	if (entry.date) {
		const date = new Date(entry.date);
		if (!Number.isNaN(date.getTime())) {
			return date;
		}
	}

	const match = entry.path.match(/(\d{4})-(\d{2})/);
	if (match) {
		return new Date(Number(match[1]), Number(match[2]) - 1, 1);
	}

	return new Date();
}

export function GET() {
	const entries = [...changelog]
		.filter((entry) => entry.path.startsWith("changelog/") && entry.path !== "changelog")
		.sort((a, b) => getChangelogDate(b).getTime() - getChangelogDate(a).getTime());

	const items = entries
		.map((entry) => {
			const pubDate = getChangelogDate(entry).toUTCString();
			const link = `${siteConfig.url}/docs/${entry.path}`;
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
