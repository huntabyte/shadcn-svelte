import type {
	HTMLDivAttributes,
	Transition,
	TransitionParams
} from "$primitives/internal";
import type { OmitOpen, Expand } from "$primitives/internal/types";
import type { CreateCollapsibleProps } from "@melt-ui/svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

type Props = Expand<
	OmitOpen<CreateCollapsibleProps> & {
		open?: CreateCollapsibleProps["defaultOpen"] & {};
	}
> &
	HTMLDivAttributes;

type ContentProps<T extends Transition = Transition> = {
	transition?: T;
	transitionConfig?: TransitionParams<T>;
} & HTMLDivAttributes;

type TriggerProps = {
	asChild?: boolean;
} & HTMLButtonAttributes;

export type {
	Props,
	ContentProps,
	TriggerProps,
	//
	Props as CollapsibleProps,
	ContentProps as CollapsibleContentProps,
	TriggerProps as CollapsibleTriggerProps
};
