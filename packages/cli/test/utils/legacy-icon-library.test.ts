import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it, expect, afterEach } from "vitest";
import { resolveIconLibrary } from "../../src/utils/config/utils.js";

const dirs: string[] = [];

function project(pkg: object) {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aui-config-"));
	dirs.push(dir);
	fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify(pkg));
	return dir;
}

afterEach(() => {
	for (const d of dirs.splice(0)) fs.rmSync(d, { recursive: true, force: true });
});

describe("iconLibrary default for an existing components.json", () => {
	it("is phosphor for a project without Lucide", () => {
		const dir = project({ devDependencies: { "tailwind-variants": "^3" } });
		expect(resolveIconLibrary(dir, {})).toBe("phosphor");
	});

	it("stays lucide when the key is missing and the project already uses @lucide/svelte", () => {
		const dir = project({ devDependencies: { "@lucide/svelte": "^1" } });
		expect(resolveIconLibrary(dir, {})).toBe("lucide");
	});

	it("is phosphor when the project has both, since it has started moving", () => {
		const dir = project({ devDependencies: { "@lucide/svelte": "^1", "phosphor-svelte": "^3" } });
		expect(resolveIconLibrary(dir, {})).toBe("phosphor");
	});

	it("falls back to phosphor when there is no readable package.json", () => {
		const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aui-config-"));
		dirs.push(dir);
		expect(resolveIconLibrary(dir, {})).toBe("phosphor");
	});

	it("never overrides a key the user wrote", () => {
		const dir = project({ devDependencies: { "@lucide/svelte": "^1" } });
		expect(resolveIconLibrary(dir, { iconLibrary: "phosphor" })).toBe("phosphor");
		expect(resolveIconLibrary(dir, { iconLibrary: "tabler" })).toBe("tabler");
	});
});
