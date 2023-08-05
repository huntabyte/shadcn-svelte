import { createLabel } from "@melt-ui/svelte";

export const ctx = {
	getLabel: () => {
		const {
			elements: { root: label }
		} = createLabel();
		return label;
	}
};
