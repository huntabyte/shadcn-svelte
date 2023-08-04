import {
	melt,
	createToggle,
	type CreateToggleProps as ToggleProps
} from "@melt-ui/svelte";

export { default as Toggle } from "./Toggle.svelte";

const ctx = {
	get
};

function get(props: ToggleProps) {
	const {
		elements: { root },
		states: { pressed }
	} = createToggle(props);
	return { root, isPressed: pressed };
}

export { melt, ToggleProps, ctx };
