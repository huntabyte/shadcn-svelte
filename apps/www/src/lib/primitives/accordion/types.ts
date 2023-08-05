import type {
	HTMLDivAttributes,
	ObjectVariation,
	Transition,
	TransitionParams,
	OmitValue
} from "$primitives/internal/types";
import type {
	CreateAccordionProps,
	AccordionItemProps as _ItemProps,
	AccordionHeadingProps as _HeadingProps
} from "@melt-ui/svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

type Props = OmitValue<CreateAccordionProps> & {
	value?: CreateAccordionProps["defaultValue"] & {};
} & HTMLDivAttributes;

type ItemProps = ObjectVariation<_ItemProps> & HTMLDivAttributes;
type HeaderProps = ObjectVariation<_HeadingProps> & HTMLDivAttributes;
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
