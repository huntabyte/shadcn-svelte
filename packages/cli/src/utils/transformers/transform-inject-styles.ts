import type { Transformer } from "./index.js";

export const createTransformInjectStyles = (styles: Record<string, string>) => {
	const transformInjectStyles: Transformer = async ({ content }) => {
		for (const [className, classes] of Object.entries(styles)) {
			content = content.replace(className, classes);
		}
		return { content };
	};

	return transformInjectStyles;
};
