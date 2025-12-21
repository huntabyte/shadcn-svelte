import { strip } from "@svecosystem/strip-types";
import { transform as sucraseTransform } from "sucrase";
import type { Transformer } from "./index.js";

const CONSECUTIVE_NEWLINE_REGEX = new RegExp(/^\s\s*\n+/gm);

export const transformStripTypes: Transformer = async ({ content, filePath }) => {
	if (filePath.endsWith(".svelte")) {
		content = strip(content, { filename: filePath });
	} else {
		content = sucraseTransform(content, {
			transforms: ["typescript"],
			disableESTransforms: true,
		}).code.trim();
	}

	if (filePath.endsWith(".ts")) {
		filePath = filePath.replace(".ts", ".js");
	}

	// cursed formatting
	content = content.replaceAll(CONSECUTIVE_NEWLINE_REGEX, "\n");

	return { content, filePath };
};
