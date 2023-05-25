import { HoverCard as HoverCardPrimitive } from "radix-svelte";

export { default as HoverCardContent } from "./HoverCardContent.svelte";
export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;
export const HoverCardPortal = HoverCardPrimitive.Portal;
