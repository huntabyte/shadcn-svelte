import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { expect, it } from "vitest";

it("checks both calendars by default against the same upstream file and detects slot drift", () => {
	const root = fs.mkdtempSync(path.join(os.tmpdir(), "calendar-parity-"));
	const write = (file: string, content: string) => {
		const target = path.join(root, file);
		fs.mkdirSync(path.dirname(target), { recursive: true });
		fs.writeFileSync(target, content);
	};
	try {
		write(
			"apps/v4/registry/bases/radix/ui/calendar.tsx",
			'function Calendar() { return <div className="flex gap-4" /> }'
		);
		write(
			"docs/static/registry/styles/nova/index.json",
			JSON.stringify(["calendar", "range-calendar"].map((name) => ({ name, type: "registry:ui" })))
		);
		for (const name of ["calendar", "range-calendar"]) {
			write(`docs/src/lib/registry/ui/${name}/${name}.svelte`, `<div class="flex gap-4" />`);
		}
		const run = () =>
			spawnSync(
				process.execPath,
				[
					path.resolve(import.meta.dirname, "../src/index.ts"),
					"base",
					"--check",
					"--docs",
					path.join(root, "docs"),
				],
				{ env: { ...process.env, SHADCN_UI: root }, encoding: "utf8" }
			);
		const passing = run();
		expect(passing.status, passing.stderr).toBe(0);
		expect(passing.stdout).toMatch(/range-calendar\s+\|\s+100%/);
		expect(passing.stdout).toMatch(/Items\s+\|\s+2/);
		write(
			"docs/src/lib/registry/ui/range-calendar/range-calendar-day.svelte",
			'<div class="bg-destructive text-white" />'
		);
		const failing = run();
		expect(failing.status).toBe(1);
		expect(failing.stdout).toContain("range-calendar-day.svelte");
	} finally {
		fs.rmSync(root, { recursive: true, force: true });
	}
});
