import { Popover as PopoverPrimitive } from "@huntabyte/primitives";
import Content from "./popover-content.svelte";
const Root = PopoverPrimitive.Root;
const Trigger = PopoverPrimitive.Trigger;

export {
	Root,
	Content,
	Trigger,
	//
	Root as Popover,
	Content as PopoverContent,
	Trigger as PopoverTrigger
};
