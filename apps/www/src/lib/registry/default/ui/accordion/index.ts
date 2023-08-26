import { Accordion as AccordionPrimitive } from "bits-ui";
import Content from "./accordion-content.svelte";
import Item from "./accordion-item.svelte";
import Trigger from "./accordion-trigger.svelte";
const Root = AccordionPrimitive.Root;

export {
	Root,
	Content,
	Item,
	Trigger,
	//
	Root as Accordion,
	Content as AccordionContent,
	Item as AccordionItem,
	Trigger as AccordionTrigger
};
