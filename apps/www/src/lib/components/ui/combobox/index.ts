import {
	melt,
	type CreateComboboxProps as ComboboxProps,
	type Combobox as ComboboxReturn,
	type ComboboxItemProps,
	createCombobox
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import Root from "./Combobox.svelte";
import Content from "./ComboboxContent.svelte";
import Input from "./ComboboxInput.svelte";
import Item from "./ComboboxItem.svelte";
import Trigger from "./ComboboxTrigger.svelte";

const NAME = "Combobox";

export const ctx = {
	set,
	get,
	getInputValue: () => get().states.inputValue,
	getInput: () => get().elements.input,
	getContent,
	getItem
};

function set<T>(props: ComboboxProps<T>) {
	const combobox = createCombobox({ ...props, forceVisible: true });
	setContext(NAME, combobox);
	return combobox.states.filteredItems;
}

function get() {
	return getContext<ComboboxReturn>(NAME);
}

function getContent() {
	const {
		elements: { menu: content }
	} = get();
	return content;
}

function getItem() {
	const {
		elements: { item },
		helpers: { isSelected }
	} = get();
	return { item, isSelected };
}

export { melt, type ComboboxProps, type ComboboxItemProps };

export const Combobox = Object.assign(Root, {
	Content,
	Item,
	Input,
	Trigger
});
