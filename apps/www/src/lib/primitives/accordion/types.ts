import type {
	ObjectVariation,
	Transition,
	TransitionParams
} from "$primitives/internal/types";
import type {
	CreateAccordionProps,
	AccordionItemProps as ItemProps,
	AccordionHeadingProps as HeadingProps,
	Accordion as AccordionReturn
} from "@melt-ui/svelte";
import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";

type AccordionItemProps = ObjectVariation<ItemProps> &
	HTMLAttributes<HTMLDivElement>;
type AccordionHeaderProps = ObjectVariation<HeadingProps> &
	HTMLAttributes<HTMLDivElement>;
type AccordionTriggerProps = AccordionItemProps & HTMLButtonAttributes;
type AccordionContentProps<T extends Transition> =
	HTMLAttributes<HTMLDivElement> & {
		transition?: Transition;
		transitionConfig?: TransitionParams<T>;
	};

export type {
	CreateAccordionProps as AccordionProps,
	AccordionItemProps,
	AccordionHeaderProps,
	AccordionReturn,
	AccordionTriggerProps,
	AccordionContentProps
};
