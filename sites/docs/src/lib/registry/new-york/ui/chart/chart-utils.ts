export const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
	[k in string]: {
		label?: string;
		// This will be `Component` after lucide-svelte updates types
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		icon?: any;
	} & (
		| { color?: string; theme?: never }
		| { color?: never; theme: Record<keyof typeof THEMES, string> }
	);
};

// Helper to extract item config from a payload.
export function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown) {
	// Ensure the payload is an object
	if (typeof payload !== "object" || payload === null) return;

	// Determine if this is a cDomain/cRange chart based on the config -> payload mapping
	// so we need to determine if our payload has the value or the key
	const payloadKeys = Object.keys(payload);
	const configKeys = Object.keys(config);

	// check if every config key is in the payload keys
	// if so, we can map the payload to the config
	// if not, we're in a cDomain/cRange chart and need to handle color mapping differently
	if (configKeys.every((key) => payloadKeys.includes(key))) {
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
			})
			.filter(Boolean); // Filter out undefined values
	} else {
		return payloadKeys
			.map((key) => {
				const itemValue = (payload as Record<string, unknown>)[key];
				const itemConfig = config[key];

				// Return the config merged with the value if the config exists for this key
				if (itemConfig) {
					// try to get color from the config using the value
					let payloadColor = itemConfig?.color;
					if (!payloadColor && "color" in payload) {
						const color = payload.color;
						if (typeof color === "string") {
							payloadColor = color;
						}
					}
					return {
						...itemConfig, // chartConfig properties (label, color, etc.)
						color: payloadColor, // color from payload vs from config since we're in a cDomain/cRange chart
						value: itemValue, // payload value
					};
				}
			})
			.filter(Boolean);
	}
}
