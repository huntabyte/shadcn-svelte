import type {
	HTMLDivAttributes,
	Transition,
	TransitionParams
} from "$primitives/internal";
import type { CreateCollapsibleProps } from "@melt-ui/svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

type Props = CreateCollapsibleProps & HTMLDivAttributes;
type ContentProps<T extends Transition = Transition> = HTMLDivAttributes & {
	transition?: T;
	transitionConfig?: TransitionParams<T>;
};
type TriggerProps = HTMLButtonAttributes & {
	asChild?: boolean;
};

export type {
	Props,
	ContentProps,
	TriggerProps,
	//
	Props as CollapsibleProps,
	ContentProps as CollapsibleContentProps,
	TriggerProps as CollapsibleTriggerProps
};
