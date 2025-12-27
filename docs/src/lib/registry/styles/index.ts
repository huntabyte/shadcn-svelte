import Vega from "./icons/vega.svelte";
import Nova from "./icons/nova.svelte";
import Maia from "./icons/maia.svelte";
import Lyra from "./icons/lyra.svelte";
import Mira from "./icons/mira.svelte";

export const STYLES = [
	{
		name: "vega",
		title: "Vega",
		description: "The classic shadcn/ui look. Clean, neutral, and familiar.",
		icon: Vega,
	},
	{
		name: "nova",
		title: "Nova",
		description: "Reduced padding and margins for compact layouts.",
		icon: Nova,
	},
	{
		name: "maia",
		title: "Maia",
		description: "Soft and rounded, with generous spacing.",
		icon: Maia,
	},
	{
		name: "lyra",
		title: "Lyra",
		description: "Boxy and sharp. Pairs well with mono fonts.",
		icon: Lyra,
	},
	{
		name: "mira",
		title: "Mira",
		description: "Compact. Made for dense interfaces.",
		icon: Mira,
	},
] as const;

export type Style = (typeof STYLES)[number];
