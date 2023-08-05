import type {
	HTMLDivAttributes,
	ObjectVariation,
	Transition,
	TransitionParams
} from "$primitives/internal/types";
import type {
	CreateAccordionProps,
	AccordionItemProps as _ItemProps,
	AccordionHeadingProps as _HeadingProps
} from "@melt-ui/svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

type Props = CreateAccordionProps & HTMLDivAttributes;
type ItemProps = ObjectVariation<_ItemProps>;
type HeaderProps = ObjectVariation<_HeadingProps>;
type TriggerProps = ItemProps & HTMLButtonAttributes;

type ContentProps<T extends Transition = Transition> = HTMLDivAttributes & {
	transition?: T;
	transitionConfig?: TransitionParams<T>;
};

export type {
	Props,
	ItemProps,
	HeaderProps,
	TriggerProps,
	ContentProps,
	//
	Props as AccordionProps,
	ItemProps as AccordionItemProps,
	HeaderProps as AccordionHeaderProps,
	TriggerProps as AccordionTriggerProps,
	ContentProps as AccordionContentProps
};
