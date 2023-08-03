import { default as Root } from "./Accordion.svelte";
import { default as Content } from "./AccordionContent.svelte";
import { default as Item } from "./AccordionItem.svelte";
import { default as Trigger } from "./AccordionTrigger.svelte";
import {
	createAccordion,
	type Accordion as AccordionReturn,
	type AccordionItemProps as ItemProps,
	type CreateAccordionProps,
	type AccordionHeadingProps as HeadingProps
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

const ITEM_PROPS = "AccordionItemProps";
const NAME = "Accordion";

export const ctx = {
	set: setAccordion,
	get: getAccordion,
	setItem: setAccordionItem,
	getItemProps,
	getContent,
	getTriggerAndHeading
};

function setAccordion(props: CreateAccordionProps) {
	setContext(NAME, createAccordion({ ...props }));
	const {
		elements: { root }
	} = getContext<AccordionReturn>(NAME);
	return root;
}

function getAccordion() {
	return getContext<AccordionReturn>(NAME);
}

function setAccordionItem(props: AccordionItemProps) {
	setContext(ITEM_PROPS, props);
	const {
		elements: { item }
	} = getAccordion();
	return { item, props: getContext<AccordionItemProps>(ITEM_PROPS) };
}

function getItemProps() {
	const itemProps = getContext<AccordionItemProps>(ITEM_PROPS);
	return itemProps;
}

function getContent() {
	const {
		elements: { content },
		helpers: { isSelected },
		states: { value }
	} = getAccordion();
	const { value: props } = getItemProps();
	return { content, props, isSelected, value };
}

function getTriggerAndHeading(level: AccordionHeadingProps["level"]) {
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

type ObjectVariation<T> = T extends object ? T : never;

export const Accordion = Object.assign(Root, {
	Content,
	Item,
	Trigger
});

export { Root as AccordionRoot };
export { Content as AccordionContent };
export { Item as AccordionItem };
export { Trigger as AccordionTrigger };

export type AccordionElements = {
	item: AccordionItemProps;
	content: AccordionItemProps;
	trigger: AccordionItemProps;
	heading: AccordionHeadingProps;
};
export type AccordionItemProps = ObjectVariation<ItemProps>;
export type AccordionHeadingProps = ObjectVariation<HeadingProps>;
export type { CreateAccordionProps } from "@melt-ui/svelte";
