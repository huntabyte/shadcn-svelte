import {
	createAccordion,
	type Accordion,
	type AccordionItemProps as ItemProps,
	type CreateAccordionProps,
	type AccordionHeadingProps as HeadingProps
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

export { default as Accordion } from "./Accordion.svelte";
export { default as AccordionContent } from "./AccordionContent.svelte";
export { default as AccordionItem } from "./AccordionItem.svelte";
export { default as AccordionTrigger } from "./AccordionTrigger.svelte";
export { melt, type CreateAccordionProps } from "@melt-ui/svelte";

type ObjectVariation<T> = T extends object ? T : never;
export type AccordionItemProps = ObjectVariation<ItemProps>;
export type AccordionTriggerProps = AccordionItemProps;
export type AccordionHeadingProps = ObjectVariation<HeadingProps>;

export type AccordionElements = {
	item: AccordionItemProps;
	content: AccordionItemProps;
	trigger: AccordionTriggerProps;
	heading: AccordionHeadingProps;
};

const ITEM_PROPS = "accordion_itemProps";
const COMPONENT_NAME = "accordion";

export const accordion = {
	set: setAccordion,
	get: getAccordion,
	setItem: setAccordionItem,
	getItemProps,
	getContent,
	getTriggerAndHeading
};

export function setAccordion(props: CreateAccordionProps) {
	setContext(COMPONENT_NAME, createAccordion({ ...props }));
	const {
		elements: { root }
	} = getContext<Accordion>(COMPONENT_NAME);
	return root;
}

export function getAccordion() {
	return getContext<Accordion>(COMPONENT_NAME);
}

export function setAccordionItem(props: AccordionItemProps) {
	setContext(ITEM_PROPS, props);
	const {
		elements: { item }
	} = getAccordion();
	return { item, props: getContext<AccordionItemProps>(ITEM_PROPS) };
}

export function getItemProps() {
	const itemProps = getContext<AccordionItemProps>(ITEM_PROPS);
	return itemProps;
}

export function getContent() {
	const {
		elements: { content },
		helpers: { isSelected },
		states: { value }
	} = getAccordion();
	const { value: props } = getItemProps();
	return { content, props, isSelected, value };
}

export function getTriggerAndHeading(level: AccordionHeadingProps["level"]) {
	const {
		elements: { trigger, heading },
		states: { value }
	} = getAccordion();
	const props = getItemProps();
	return {
		trigger,
		heading,
		props: {
			heading: { level },
			trigger: props
		},
		value
	};
}
