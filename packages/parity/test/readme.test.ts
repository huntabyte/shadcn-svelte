import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import * as commands from "../src/commands/index.ts";

const root = path.resolve(import.meta.dirname, "..");
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")) as {
	name: string;
	exports: Record<string, string>;
};
const docsPackageJson = JSON.parse(
	fs.readFileSync(path.resolve(root, "../../docs/package.json"), "utf8")
) as { scripts: Record<string, string> };

/**
 * The README is the reference for how the parity tool behaves. These checks
 * make sure nothing is added to the CLI surface without being documented.
 */
describe("README", () => {
	for (const command of Object.values(commands)) {
		it(`documents the \`${command.name()}\` command`, () => {
			expect(readme).toContain(`parity ${command.name()}`);
		});

		for (const option of command.options) {
			it(`documents the \`${option.long}\` option of \`${command.name()}\``, () => {
				expect(readme).toContain(option.long);
			});
		}
	}

	for (const [script, value] of Object.entries(docsPackageJson.scripts)) {
		if (!value.startsWith("parity")) continue;
		it(`documents the docs script \`${script}\``, () => {
			expect(readme).toContain(`pnpm -F docs ${script}`);
		});
	}

	for (const subpath of Object.keys(packageJson.exports)) {
		const specifier = path.posix.join(packageJson.name, subpath);
		it(`documents the \`${specifier}\` export`, () => {
			expect(readme).toContain(`\`${specifier}\``);
		});
	}
});
