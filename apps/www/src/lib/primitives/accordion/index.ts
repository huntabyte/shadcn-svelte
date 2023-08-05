import Root from "./components/Accordion.svelte";
import Item from "./components/AccordionItem.svelte";
import Header from "./components/AccordionHeader.svelte";
import Trigger from "./components/AccordionTrigger.svelte";
import Content from "./components/AccordionContent.svelte";

export {
	Root,
	Item,
	Header,
	Trigger,
	Content,
	//
	Root as Accordion,
	Item as AccordionItem,
	Header as AccordionHeader,
	Trigger as AccordionTrigger,
	Content as AccordionContent
};

export * from "./types";
