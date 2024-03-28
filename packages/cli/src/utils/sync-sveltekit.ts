import { execa } from "execa";
import { getPackageManager } from "./get-package-manager.js";
import { isUsingSvelteKit } from "./get-package-info.js";

// if it's a SvelteKit project, run sync so that the aliases are always up to date
export async function syncSvelteKit(cwd: string) {
	const isSvelteKit = isUsingSvelteKit(cwd);
	if (isSvelteKit) {
		const packageManager = await getPackageManager(cwd);
		await execa(packageManager === "npm" ? "npx" : packageManager, ["svelte-kit", "sync"], {
			cwd,
		});
	}
}
