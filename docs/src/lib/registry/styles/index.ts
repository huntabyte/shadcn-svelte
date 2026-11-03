import Ledger from "./icons/ledger.svelte";

// Another UI Svelte ships one style. Ledger: dense, quiet and flat. Inter at 13px, a 28px default control, hairline borders, one blue accent.
export const STYLES = [
	{
		name: "ledger",
		title: "Ledger",
		description: "Dense, quiet and flat. Inter at 13px, hairline borders, one blue accent.",
		icon: Ledger,
	},
] as const;

export type Style = (typeof STYLES)[number];
