import color from "chalk";
import * as p from "./prompts.js";
import { getPackageInfo } from "./get-package-info.js";

export function intro() {
	const packageInfo = getPackageInfo();
	const title = color.bgHex("#FF5500").black(" shadcn-svelte ");
	const version = color.gray(` v${packageInfo.version} `);
	p.intro(title + version);
}

export function cancel() {
	p.cancel("Operation cancelled.");
	process.exit(0);
}

/**
 * Prettifies the list by joining on `,` and printing a new line on every 8th element.
 */
export function prettifyList(arr: string[]): string {
	return arr.reduce((pre, curr, i) => {
		if ((i + 1) % 9 === 0) return `${pre},\n${curr}`;
		return `${pre}, ${curr}`;
	});
}
