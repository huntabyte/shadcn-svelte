import {
	createCheckbox,
	type Checkbox as CheckboxReturn
} from "@melt-ui/svelte";
import type { CheckboxProps } from "./types";
import { getContext, setContext } from "svelte";

const NAME = "Checkbox";

export const ctx = {
	set,
	get,
	getIndicator,
	getInput,
	getCheckbox
};

function set(props: CheckboxProps) {
	const checkbox = createCheckbox(props);
	setContext(NAME, checkbox);
	return {
		root: checkbox.elements.root,
		input: checkbox.elements.input
	};
}

function get() {
	return getContext<CheckboxReturn>(NAME);
}

function getCheckbox() {
	return get().elements.root;
}

function getIndicator() {
	return {
		isChecked: get().helpers.isChecked,
		isIndeterminate: get().helpers.isIndeterminate
	};
}

function getInput() {
	return get().elements.input;
}
