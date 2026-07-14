import { execSync } from "node:child_process";

if (process.env.SHADCN_SKIP_POSTINSTALL === "1") {
	console.log("Skipping shadcn-svelte postinstall work.");
} else {
	execSync("pnpm build:cli && pnpm -r sync", { stdio: "inherit", shell: true });
}
