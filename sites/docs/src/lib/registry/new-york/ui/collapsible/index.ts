import { Collapsible as CollapsiblePrimitive } from "bits-ui";

const Root: typeof CollapsiblePrimitive.Root = CollapsiblePrimitive.Root;
const Trigger: typeof CollapsiblePrimitive.Trigger = CollapsiblePrimitive.Trigger;
const Content: typeof CollapsiblePrimitive.Content = CollapsiblePrimitive.Content;

export {
	Root,
	Content,
	Trigger,
	//
	Root as Collapsible,
	Content as CollapsibleContent,
	Trigger as CollapsibleTrigger,
};
