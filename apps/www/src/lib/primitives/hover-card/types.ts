import type { HTMLDivAttributes } from "$primitives/internal";
import type { CreateHoverCardProps } from "@melt-ui/svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";

type Props = CreateHoverCardProps;
type TriggerProps = HTMLAnchorAttributes;
type ContentProps = HTMLDivAttributes;

export type {
	Props,
	TriggerProps,
	ContentProps,
	//
	Props as HoverCardProps,
	TriggerProps as HoverCardTriggerProps,
	ContentProps as HoverCardContentProps
};
