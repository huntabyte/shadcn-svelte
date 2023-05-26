import { Select as SelectPrimitive } from "radix-svelte";

export { default as SelectContent } from "./SelectContent.svelte";
export { default as SelectLabel } from "./SelectItem.svelte";
export { default as SelectSeparator } from "./SelectSeparator.svelte";
export { default as SelectTrigger } from "./SelectTrigger.svelte";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;
