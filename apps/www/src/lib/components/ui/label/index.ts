import { createLabel, melt } from "@melt-ui/svelte";

export { default as Label } from "./Label.svelte";
export { melt };

export const ctx = {
	getLabel: () => {
		const {
			elements: { root: label }
		} = createLabel();
		return label;
	}
};
