import process from "node:process";
import color from "picocolors";
import * as p from "@clack/prompts";
import { getCLIPackageInfo } from "./get-package-info.js";

// TODO (43081j): remove once picocolors supports RGB
const backgroundOrange = (str: string) => `\x1b[48;2;255;85;0m${str}\x1b[0m`;

export function intro() {
	const packageInfo = getCLIPackageInfo();
	const title = backgroundOrange(color.black(" shadcn-svelte "));
	const version = color.gray(` v${packageInfo.version} `);
	p.intro(title + version);

	// @ts-expect-error types for these globals are not defined
	if (typeof Bun !== "undefined" || typeof Deno !== "undefined") {
		p.log.warn(
			`You are currently using an unsupported runtime. Only Node.js v22 or higher is officially supported. Continue at your own risk.`
		);
	}
}

export function cancel(msg = "Operation cancelled."): never {
	p.cancel(msg);
	process.exit(0);
}

/**
 * Prettifies the list by joining on `,` and printing a new line on every Nth element.
 *
 */
export function prettifyList(arr: string[], max: number = 9): string {
	return arr.reduce((pre, curr, i) => {
		if (i % max === 0) return `${pre},\n${curr}`;
		return `${pre}, ${curr}`;
	});
}

export function getPadding(lines: string[]) {
	const lengths = lines.map((s) => s.length);
	return Math.max(...lengths);
}
