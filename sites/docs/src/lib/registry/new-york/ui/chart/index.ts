import type { Icon } from "lucide-svelte";
import type { ComponentType } from "svelte";
import ChartContainer from "./chart-container.svelte";
import ChartLegend from "./chart-legend.svelte";
import ChartTooltip from "./chart-tooltip.svelte";

export const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
	[k in string]: {
		label?: string;
		icon?: ComponentType<Icon>;
	} & (
		| { color?: string; theme?: never }
		| { color?: never; theme: Record<keyof typeof THEMES, string> }
	);
};

// Helper to extract item config from a payload.
export function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown) {
	// Ensure the payload is an object
	if (typeof payload === "object" && payload !== null) {
		// Get all the keys in the payload dynamically
		const payloadKeys = Object.keys(payload);

		// Loop over the keys from the payload
		return payloadKeys
			.map((key) => {
				const itemValue = (payload as Record<string, unknown>)[key];
				const itemConfig = config[key];

				// Return the config merged with the value if the config exists for this key
				if (itemConfig) {
					return {
						...itemConfig, // chartConfig properties (label, color, etc.)
						value: itemValue, // payload value
					};
				}
				// If there's no config for the key, return undefined or skip it
				return undefined;
			})
			.filter(Boolean); // Filter out undefined values
	}

	// Return undefined if the payload is invalid
	return undefined;
}

export {
	ChartContainer,
	ChartContainer as Container,
	ChartLegend,
	ChartLegend as Legend,
	ChartTooltip,
	ChartTooltip as Tooltip,
};
