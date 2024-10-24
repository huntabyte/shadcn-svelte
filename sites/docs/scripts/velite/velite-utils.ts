import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
export const veliteIndexPath = join(__dirname, "../../.velite/index.js");

export async function updateJsonImport(onUpdatingChange?: (isUpdating: boolean) => void) {
	onUpdatingChange?.(true);

	const data = await readFile(veliteIndexPath, "utf8").catch((err) => {
		console.error("Error reading file:", err);
		onUpdatingChange?.(false);
	});
	if (!data) return;
	if (data.includes("with { type: 'json' }")) return;

	const updatedContent = data.replaceAll(".json'", ".json' with { type: 'json' }");
	if (updatedContent === data) {
		onUpdatingChange?.(false);
		return;
	}

	await writeFile(veliteIndexPath, updatedContent, "utf8").catch((err) => {
		console.error("Error writing file:", err);
	});
	onUpdatingChange?.(false);
}
