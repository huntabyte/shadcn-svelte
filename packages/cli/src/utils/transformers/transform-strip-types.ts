import { strip } from "@svecosystem/strip-types";
import { transform as sucraseTransform } from "sucrase";
import type { Transformer } from "./index.js";

const CONSECUTIVE_NEWLINE_REGEX = new RegExp(/^\s\s*\n+/gm);

export const transformStripTypes: Transformer = async ({ content, filePath }) => {
	const result = {
		content,
		filePath,
	};
	if (filePath.endsWith(".svelte")) {
		result.content = strip(content, { filename: filePath });
	} else {
		result.content = sucraseTransform(content, {
			transforms: ["typescript"],
			disableESTransforms: true,
		}).code.trim();
	}

	if (filePath.endsWith(".ts")) {
		filePath = filePath.replace(".ts", ".js");
	}

	// cursed formatting
	result.content = content.replaceAll(CONSECUTIVE_NEWLINE_REGEX, "\n");

	return result;
};
