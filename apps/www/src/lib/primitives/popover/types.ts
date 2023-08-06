import type {
	OmitOpen,
	Expand,
	HTMLDivAttributes,
	Transition,
	TransitionParams
} from "$primitives/internal";
import type { CreatePopoverProps } from "@melt-ui/svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

type Props = Expand<
	OmitOpen<CreatePopoverProps> & {
		open?: CreatePopoverProps["defaultOpen"];
	}
>;

type ContentProps<T extends Transition = Transition> = HTMLDivAttributes & {
	transition?: T;
	transitionConfig?: TransitionParams<T>;
};

type TriggerProps = {
	asChild?: boolean;
} & HTMLButtonAttributes;

export type {
	Props,
	ContentProps,
	TriggerProps,
	Props as PopoverProps,
	ContentProps as PopoverContentProps,
	TriggerProps as PopoverTriggerProps
};
