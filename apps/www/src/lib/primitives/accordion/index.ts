import Root from "./components/Accordion.svelte";
import Content from "./components/AccordionContent.svelte";
import Item from "./components/AccordionItem.svelte";
import Trigger from "./components/AccordionTrigger.svelte";
import Header from "./components/AccordionHeader.svelte";

export {
	Root,
	Content,
	Item,
	Trigger,
	Header,
	//
	Root as Accordion,
	Content as AccordionContent,
	Item as AccordionItem,
	Trigger as AccordionTrigger,
	Header as AccordionHeader
};

export * from "./types";
