import {
	createSeparator,
	type CreateSeparatorProps as SeparatorProps,
	melt
} from "@melt-ui/svelte";

export { melt, SeparatorProps };
export { default as Separator } from "./Separator.svelte";

export const ctx = {
	get
};

function get(props: SeparatorProps) {
	return createSeparator(props).elements.root;
}
