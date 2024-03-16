import * as p from "./prompts.js";
import color from "chalk";
import { getPackageInfo } from "./get-package-info.js";

export function intro() {
	const packageInfo = getPackageInfo();
	const title = color.bgHex("#FF5500").black(" shadcn-svelte ");
	const version = color.gray(` v${packageInfo.version} `);
	p.intro(title + version);
}
