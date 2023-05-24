import { HoverCard as HoverCardPrimitive } from "radix-svelte";
import HoverCardContent from "./HoverCardContent.svelte";

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;
const HoverCardPortal = HoverCardPrimitive.Portal;

export { HoverCard, HoverCardContent, HoverCardPortal, HoverCardTrigger };
