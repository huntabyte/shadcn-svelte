import {
	createCheckbox,
	type Checkbox as CheckboxReturn,
	type CreateCheckboxProps
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import { removeUndefined, getOptionUpdater } from "../internal/helpers";

const NAME = "Checkbox";

export const ctx = {
	set,
	get,
	getIndicator,
	getInput,
	getCheckbox
};

function set(props: CreateCheckboxProps) {
	const checkbox = createCheckbox(removeUndefined(props));
	setContext(NAME, checkbox);
	return {
		...checkbox,
		updateOption: getOptionUpdater(checkbox.options)
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
