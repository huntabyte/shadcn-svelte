import {
	createAccordion,
	type Accordion as AccordionReturn
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import type { AccordionItemProps, AccordionProps } from "./types";

const NAME = "Accordion";
const ITEM_NAME = "AccordionItem";

export const ctx = {
	set: setAccordion,
	get: getAccordion,
	setItem: setAccordionItem,
	getItemProps,
	getContent,
	getTrigger,
	getHeader
};

function setAccordion(props: AccordionProps) {
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
	setContext(ITEM_NAME, { ...props });
	const {
		elements: { item }
	} = getAccordion();
	return { item, props };
}

function getItemProps() {
	const itemProps = getContext<AccordionItemProps>(ITEM_NAME);
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

function getTrigger() {
	const {
		elements: { trigger }
	} = getAccordion();
	const { value: props } = getItemProps();
	return { props, trigger };
}

function getHeader() {
	const {
		elements: { heading: header }
	} = getAccordion();
	return header;
}
