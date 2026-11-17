import path from "node:path";
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const revision = "8aff5151e251ffda2f88e29f26c8291420202b2b";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const temp = mkdtempSync(path.join(tmpdir(), "bits-ui-snapshot-"));
const source = path.join(temp, "source");
const run = (command, args, cwd = source) => execFileSync(command, args, { cwd, stdio: "inherit" });
try {
	run("git", ["clone", "https://github.com/huntabyte/bits-ui.git", source], temp);
	run("git", ["checkout", "--detach", revision]);
	const actual = execFileSync("git", ["rev-parse", "HEAD"], {
		cwd: source,
		encoding: "utf8",
	}).trim();
	if (actual !== revision) throw new Error(`Unexpected source revision: ${actual}`);
	// pnpm honors the source repository's pinned packageManager (10.33.0).
	run("pnpm", ["install", "--frozen-lockfile"]);
	run("pnpm", ["build:packages"]);
	run("pnpm", ["-F", "bits-ui", "pack", "--pack-destination", temp]);
	copyFileSync(
		path.join(temp, "bits-ui-2.21.0.tgz"),
		path.join(root, "vendor/bits-ui-8aff5151.tgz")
	);
} finally {
	rmSync(temp, { recursive: true, force: true });
}
