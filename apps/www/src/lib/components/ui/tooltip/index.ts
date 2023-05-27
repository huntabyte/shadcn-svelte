import { Tooltip as TooltipPrimitive } from "radix-svelte";

export { default as TooltipContent } from "./TooltipContent.svelte";
export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
