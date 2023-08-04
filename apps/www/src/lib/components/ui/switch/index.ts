import {
	createSwitch,
	melt,
	type CreateSwitchProps as SwitchProps
} from "@melt-ui/svelte";

export { melt, SwitchProps };
export { default as Switch } from "./Switch.svelte";

export const ctx = {
	get
};

function get(props: SwitchProps) {
	const {
		elements: { root },
		states: { checked }
	} = createSwitch(props);
	return { root, isChecked: checked };
}
