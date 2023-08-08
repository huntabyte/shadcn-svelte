import { Popover as PopoverPrimitive } from "@huntabyte/primitives";
import Content from "./PopoverContent.svelte";
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
