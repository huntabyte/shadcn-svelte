import * as PopoverPrimitive from "$primitives/popover";
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
