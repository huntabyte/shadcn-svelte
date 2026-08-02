import fs from "node:fs/promises";
import * as oxfmt from "oxfmt";
import { PRESET_STYLES } from "shadcn-svelte/preset";
import oxfmtConfig from "../../oxfmt.config.js";

async function pullStyles() {
	await Promise.all(
		PRESET_STYLES.map(async (style) => {
			console.log(`Pulling upstream style ${style}...`);
			const url = `https://raw.githubusercontent.com/shadcn-ui/ui/refs/heads/main/apps/v4/registry/styles/style-${style}.css`;
			const content = await fetch(url).then((res) => res.text());
			const filepath = `src/lib/registry/styles/style-${style}.css`;

			const formatted = await oxfmt.format(filepath, content, oxfmtConfig);
			if (formatted.errors.length) {
				console.error(`Failed to format style ${style}:`);
				console.error(formatted.errors);
				return;
			}

			await fs.writeFile(filepath, formatted.code);
			console.log(`Wrote style ${style} to ${filepath}`);
		})
	);
}

pullStyles();
