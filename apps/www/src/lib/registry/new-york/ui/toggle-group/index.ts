import type { VariantProps } from "tailwind-variants";
import type { toggleVariants } from "@/registry/new-york/ui/toggle";
import { getContext, setContext } from "svelte";
import Root from "./toggle-group.svelte";
import Item from "./toggle-group-item.svelte";

export type ToggleVariants = VariantProps<typeof toggleVariants>;

export function setToggleGroupCtx(props: ToggleVariants) {
	setContext("toggleGroup", props);
}

export function getToggleGroupCtx() {
	return getContext<ToggleVariants>("toggleGroup");
}

export {
	Root,
	Item,
	//
	Root as ToggleGroup,
	Item as ToggleGroupItem
};
