import { ALIASES, ALIAS_DEFAULTS } from "../../constants.js";
import type { Transformer } from "./index.js";

export const transformImports: Transformer = async ({ content, config }) => {
	for (const alias of ALIASES) {
		if (alias === "utils" && /\.(js|ts)$/.test(config.aliases[alias])) {
			content = content.replaceAll(
				`${ALIAS_DEFAULTS[alias].placeholder}.js`,
				config.aliases[alias]
			);
		}
		content = content.replaceAll(ALIAS_DEFAULTS[alias].placeholder, config.aliases[alias]);
	}
	return {
		content,
	};
};
