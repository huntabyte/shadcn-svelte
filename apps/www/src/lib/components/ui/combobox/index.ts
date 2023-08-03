import {
	melt,
	type CreateComboboxProps as ComboboxProps,
	type Combobox as ComboboxReturn,
	createCombobox
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

const NAME = "Combobox";

export const ctx = {
	set,
	get,
	getTrigger
};

function set<T>(props: ComboboxProps<T>) {
	const combobox = createCombobox({ ...props, forceVisible: true });
	setContext(NAME, combobox);
}

function get() {
	return getContext<ComboboxReturn>(NAME);
}

function getTrigger() {
	const {
		elements: { input },
		states: { open, inputValue }
	} = get();
	return { open, inputValue, input };
}

export { melt, type ComboboxProps };
