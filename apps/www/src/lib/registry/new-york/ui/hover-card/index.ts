import { HoverCard as HoverCardPrimitive } from "@huntabyte/primitives";

import Content from "./HoverCardContent.svelte";
const Root = HoverCardPrimitive.Root;
const Trigger = HoverCardPrimitive.Trigger;

export {
	Root,
	Content,
	Trigger,
	Root as HoverCard,
	Content as HoverCardContent,
	Trigger as HoverCardTrigger
};
