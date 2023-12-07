import { detect } from "@antfu/ni";

export async function getPackageManager(
	targetDir: string
): Promise<"yarn" | "pnpm" | "bun" | "npm"> {
	const packageManager = await detect({ programmatic: true, cwd: targetDir });
	if (packageManager === "yarn@berry") return "yarn";
	if (packageManager === "pnpm@6") return "pnpm";

	// ni couldn't find a lockfile, so we'll try to determine the PM via the user agent
	if (packageManager === null) {
		const userAgent = process.env.npm_config_user_agent;

		if (userAgent === undefined) return "npm";
		if (userAgent.startsWith("yarn")) return "yarn";
		if (userAgent.startsWith("pnpm")) return "pnpm";
	}

	// default to npm as the last resort
	return packageManager ?? "npm";
}
