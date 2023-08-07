import { RadioGroup as RadioGroupPrimitive } from "@huntabyte/primitives";

import Root from "./RadioGroup.svelte";
import Item from "./RadioGroupItem.svelte";
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
