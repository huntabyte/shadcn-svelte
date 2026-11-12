// Spread onto a component to pin a state without interaction.
export function previewState(state: string): {
	disabled?: boolean;
	"data-preview"?: string;
} {
	if (state === "disabled") {
		return { disabled: true };
	}

	if (["hover", "focus", "active"].includes(state)) {
		return { "data-preview": state };
	}

	return {};
}
