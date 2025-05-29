import { LinkPreview as HoverCardPrimitive } from "bits-ui";
import Content from "./hover-card-content.svelte";
import Trigger from "./hover-card-trigger.svelte";

const Root = HoverCardPrimitive.Root;

export {
	Root,
	Content,
	Trigger,
	Root as HoverCard,
	Content as HoverCardContent,
	Trigger as HoverCardTrigger,
};
