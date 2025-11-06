/**
 * Creates empty markdown files so that they are loaded into the manifest for
 * the cloudflare build and we can manually update them after we build so we don't
 * need to build twice or try to manipulate the manifest post build.
 */

import { globby } from "globby";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
	try {
		const files = (await globby(["content/**/*.md"])).map((filePath) => {
			const newPath = filePath.replace("content/", "docs/");
			if (newPath.endsWith("/index.md")) return newPath.replace("/index.md", ".md");
			return newPath;
		});

		for (const file of files) {
			const outputPath = join(__dirname, "../static", file);
			const outputDir = dirname(outputPath);
			await mkdir(outputDir, { recursive: true });
			await writeFile(outputPath, "\n", "utf-8");
		}

		await writeFile(join(__dirname, "../static/llms.txt"), "\n", "utf-8");
	} catch (error) {
		console.error("Error building LLM placeholder files:", error);
	}
}

main();
