import { Select as SelectPrimitive } from "@huntabyte/primitives";

import Root from "./Select.svelte";
import Label from "./SelectLabel.svelte";
import Item from "./SelectItem.svelte";
import Content from "./SelectContent.svelte";
import Trigger from "./SelectTrigger.svelte";
import Separator from "./SelectSeparator.svelte";

const Group = SelectPrimitive.Group;
const Input = SelectPrimitive.Input;
const Value = SelectPrimitive.Value;

export {
	Root,
	Item,
	Group,
	Input,
	Label,
	Value,
	Content,
	Trigger,
	Separator,
	//
	Root as Select,
	Item as SelectItem,
	Group as SelectGroup,
	Input as SelectInput,
	Label as SelectLabel,
	Value as SelectValue,
	Content as SelectContent,
	Trigger as SelectTrigger,
	Separator as SelectSeparator
};
