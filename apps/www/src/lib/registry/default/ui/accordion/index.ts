import { Accordion as AccordionPrimitive } from "@huntabyte/primitives";
import Content from "./AccordionContent.svelte";
import Item from "./AccordionItem.svelte";
import Trigger from "./AccordionTrigger.svelte";
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
