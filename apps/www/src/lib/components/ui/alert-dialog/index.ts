import { AlertDialog as AlertDialogPrimitive } from "radix-svelte";

export { default as AlertDialogAction } from "./AlertDialogAction.svelte";
export { default as AlertDialogCancel } from "./AlertDialogCancel.svelte";
export { default as AlertDialogContent } from "./AlertDialogContent.svelte";
export { default as AlertDialogDescription } from "./AlertDialogDescription.svelte";
export { default as AlertDialogFooter } from "./AlertDialogFooter.svelte";
export { default as AlertDialogHeader } from "./AlertDialogHeader.svelte";
export { default as AlertDialogTitle } from "./AlertDialogTitle.svelte";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
