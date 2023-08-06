import type { CreateTooltipProps } from "@melt-ui/svelte";
import type {
	Expand,
	HTMLDivAttributes,
	OmitOpen,
	OmitForceVisible,
	Transition,
	TransitionParams
} from "../internal/types";
import type { HTMLButtonAttributes } from "svelte/elements";

type Props = Expand<
	OmitOpen<OmitForceVisible<CreateTooltipProps>> & {
		open?: CreateTooltipProps["defaultOpen"] & {};
	}
>;

type ContentProps<T extends Transition = Transition> = {
	transition?: T;
	transitionConfig?: TransitionParams<T>;
	sideOffset?: number;
} & HTMLDivAttributes;

type TriggerProps = {
	asChild?: boolean;
} & HTMLButtonAttributes;

export type {
	Props,
	TriggerProps,
	ContentProps,
	//
	Props as TooltipProps,
	ContentProps as TooltipContentProps,
	TriggerProps as TooltipTriggerProps
};
