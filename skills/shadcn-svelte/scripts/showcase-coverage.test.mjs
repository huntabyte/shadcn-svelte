import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("./showcase-coverage.mjs", import.meta.url));

function fixture(t) {
	const root = mkdtempSync(join(tmpdir(), "showcase-coverage-"));
	t.after(() => rmSync(root, { recursive: true, force: true }));
	const ui = join(root, "components");
	const showcase = join(root, "showcase");
	mkdirSync(showcase, { recursive: true });
	for (const name of ["button", "card", "input"]) {
		mkdirSync(join(ui, name), { recursive: true });
		writeFileSync(join(ui, name, "index.ts"), "");
	}
	writeFileSync(join(ui, "utils.ts"), "");
	return { root, ui, showcase };
}

test("recognizes Svelte namespace, multiline named and dynamic barrel imports with custom aliases", (t) => {
	const { ui, showcase } = fixture(t);
	writeFileSync(
		join(showcase, "page.svelte"),
		`<script>
import {
  Button
} from "@components/button/index.js";
import * as Card from "$lib/components/card";
const Input = import("../components/input/input.svelte");
</script>`
	);
	assert.equal(
		execFileSync(process.execPath, [script, ui, showcase], { encoding: "utf8" }),
		"3/3 components imported.\n"
	);
});

test("excludes UI internals and generated sources even when the showcase root contains them", (t) => {
	const { root, ui, showcase } = fixture(t);
	writeFileSync(join(ui, "button", "button.svelte"), 'import * as Card from "../card";');
	mkdirSync(join(root, ".svelte-kit"));
	writeFileSync(join(root, ".svelte-kit", "generated.js"), 'import Input from "./input/index.js";');
	writeFileSync(join(showcase, "page.ts"), 'import { Button } from "@ui/button";');
	const result = spawnSync(process.execPath, [script, ui, root], { encoding: "utf8" });
	assert.equal(result.status, 1);
	assert.equal(result.stdout, "1/3 components imported.\nMissing: card, input\n");
});

test("does not count a plain path string as an import", (t) => {
	const { ui, showcase } = fixture(t);
	writeFileSync(join(showcase, "page.js"), 'const example = "$lib/components/card";');
	const result = spawnSync(process.execPath, [script, ui, showcase], { encoding: "utf8" });
	assert.equal(result.status, 1);
	assert.match(result.stdout, /0\/3 components imported/);
});

test("accepts a single source file and re-exports", (t) => {
	const { ui, showcase } = fixture(t);
	const file = join(showcase, "page.ts");
	writeFileSync(file, 'export * from "@ui/button/index.js";');
	const result = spawnSync(process.execPath, [script, ui, file], { encoding: "utf8" });
	assert.equal(result.status, 1);
	assert.match(result.stdout, /1\/3 components imported/);
});

test("requires both the UI directory and showcase roots", () => {
	const result = spawnSync(process.execPath, [script], { encoding: "utf8" });
	assert.equal(result.status, 1);
	assert.match(result.stderr, /Usage:/);
});
