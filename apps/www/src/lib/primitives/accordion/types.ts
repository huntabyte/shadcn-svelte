import type { ObjectVariation } from "$primitives/internal/types";
import type {
	CreateAccordionProps,
	AccordionItemProps as ItemProps,
	AccordionHeadingProps as HeadingProps,
	Accordion as AccordionReturn
} from "@melt-ui/svelte";
import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";

type AccordionItemProps = ObjectVariation<ItemProps>;
type AccordionHeaderProps = ObjectVariation<HeadingProps>;
type AccordionTriggerProps = AccordionItemProps & HTMLButtonAttributes;

type AccordionProps = CreateAccordionProps & HTMLAttributes<HTMLDivElement>;

export type {
	AccordionProps,
	AccordionItemProps,
	AccordionHeaderProps,
	AccordionReturn,
	AccordionTriggerProps
};
