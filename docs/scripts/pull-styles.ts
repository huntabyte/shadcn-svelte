import fs from "node:fs/promises";
import prettier from "prettier";

const styles = ["vega", "nova", "maia", "lyra", "mira", "luma", "sera"];

const prettierConfig = await prettier.resolveConfig(import.meta.url);
if (!prettierConfig) throw new Error("Failed to resolve prettier config.");

async function pullStyles() {
	await Promise.all(
		styles.map(async (style) => {
			console.log(`Pulling upstream style ${style}...`);
			const stylePath = `https://raw.githubusercontent.com/shadcn-ui/ui/refs/heads/main/apps/v4/registry/styles/style-${style}.css`;
			const styleContent = await fetch(stylePath).then((res) => res.text());
			const styleFilePath = `src/lib/registry/styles/style-${style}.css`;

			const formatted = await prettier.format(styleContent, {
				parser: "css",
				filepath: styleFilePath,
				...prettierConfig,
			});

			await fs.writeFile(styleFilePath, formatted);
			console.log(`Wrote style ${style} to ${styleFilePath}`);
		})
	);
}

pullStyles();
