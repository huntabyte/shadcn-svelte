import fs from "node:fs/promises";
import { PRESET_STYLES } from "shadcn-svelte/preset";

/**
 * Pulls the upstream style CSS verbatim. These files are intentionally not
 * formatted: the order of each `@apply` list is semantic for tailwind-merge,
 * so they must stay byte-for-byte identical to shadcn/ui.
 */
async function pullStyles() {
	await Promise.all(
		PRESET_STYLES.map(async (style) => {
			console.log(`Pulling upstream style ${style}...`);
			const url = `https://raw.githubusercontent.com/shadcn-ui/ui/refs/heads/main/apps/v4/registry/styles/style-${style}.css`;
			const res = await fetch(url);
			if (!res.ok) {
				console.error(`Failed to pull style ${style}: ${url} -> ${res.status}`);
				process.exitCode = 1;
				return;
			}
			const filepath = `src/lib/registry/styles/style-${style}.css`;
			await fs.writeFile(filepath, await res.text());
			console.log(`Wrote style ${style} to ${filepath}`);
		})
	);
}

pullStyles();
