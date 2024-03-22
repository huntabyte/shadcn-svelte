import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { findUp } from "find-up";

export async function getPackageManager(targetDir: string) {
	const packageManager = await detect(targetDir);

	if (packageManager === "yarn@berry") return "yarn";
	if (packageManager === "pnpm@6") return "pnpm";

	// ni successfully detected a PM
	if (packageManager !== null) return packageManager;

	// ni couldn't find a lockfile, so we'll try to determine the PM via the user agent
	const userAgent = process.env.npm_config_user_agent;
	if (userAgent === undefined) return "npm";
	if (userAgent.startsWith("yarn")) return "yarn";
	if (userAgent.startsWith("pnpm")) return "pnpm";

	// default to npm as the last resort
	return "npm";
}

// originally sourced from @antfu/ni: https://github.com/antfu/ni/blob/main/src/detect.ts

type Agent = (typeof agents)[number];
const agents = ["npm", "bun", "pnpm", "pnpm@6", "yarn", "yarn@berry"] as const;

// the order here matters, more specific one comes first
const LOCKS: Record<string, Agent> = {
	"bun.lockb": "bun",
	"pnpm-lock.yaml": "pnpm",
	"yarn.lock": "yarn",
	"package-lock.json": "npm",
	"npm-shrinkwrap.json": "npm",
};

async function detect(cwd: string) {
	let agent: Agent | null = null;

	const lockPath = await findUp(Object.keys(LOCKS), { cwd });
	let packageJsonPath: string | undefined;

	if (lockPath) packageJsonPath = path.resolve(lockPath, "../package.json");
	else packageJsonPath = await findUp("package.json", { cwd });

	// read `packageManager` field in package.json
	if (packageJsonPath && fs.existsSync(packageJsonPath)) {
		try {
			const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
			if (typeof pkg.packageManager === "string") {
				const [name, ver] = pkg.packageManager.replace(/^\^/, "").split("@");
				if (name === "yarn" && Number.parseInt(ver) > 1) {
					agent = "yarn@berry";
				} else if (name === "pnpm" && Number.parseInt(ver) < 7) {
					agent = "pnpm@6";
				} else if (agents.includes(name)) {
					agent = name;
				}
			}
		} catch {}
	}

	// detect based on lock
	if (!agent && lockPath) agent = LOCKS[path.basename(lockPath)]!;

	return agent;
}
