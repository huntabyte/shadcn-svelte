import { RadioGroup as RadioGroupPrimitive } from "@huntabyte/primitives";

import Root from "./radio-group.svelte";
import Item from "./radio-group-item.svelte";
const Input = RadioGroupPrimitive.Input;

export {
	Root,
	Input,
	Item,
	//
	Root as RadioGroup,
	Input as RadioGroupInput,
	Item as RadioGroupItem
};
