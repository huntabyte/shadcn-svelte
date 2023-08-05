import {
	createAccordion,
	type Accordion as AccordionReturn,
	type CreateAccordionProps
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import type { AccordionItemProps } from "./types";
import { getOptionUpdater, removeUndefined } from "../internal/helpers";

const NAME = "Accordion";
const ITEM_NAME = "AccordionItem";

export const ctx = {
	set,
	get,
	setItem,
	getItemProps,
	getContent,
	getTrigger,
	getHeader
};

function set(props: CreateAccordionProps) {
	const accordion = createAccordion(removeUndefined(props));
	setContext(NAME, accordion);
	return {
		...accordion,
		updateOption: getOptionUpdater(accordion.options)
	};
}

function get() {
	return getContext<AccordionReturn>(NAME);
}

function setItem(props: AccordionItemProps) {
	setContext(ITEM_NAME, { ...props });
	const {
		elements: { item }
	} = get();
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
	} = get();
	const { value: props } = getItemProps();
	return { content, props, isSelected, value };
}

function getTrigger() {
	const {
		elements: { trigger }
	} = get();
	const { value: props } = getItemProps();
	return { props, trigger };
}

function getHeader() {
	const {
		elements: { heading: header }
	} = get();
	return header;
}
