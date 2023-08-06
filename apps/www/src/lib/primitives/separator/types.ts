import type { Expand, HTMLDivAttributes } from "$primitives/internal";
import type { CreateSeparatorProps } from "@melt-ui/svelte";

type Props = Expand<CreateSeparatorProps> & HTMLDivAttributes;

export type {
	Props,
	//
	Props as SeparatorProps
};
