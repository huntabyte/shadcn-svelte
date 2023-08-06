import { getOptionUpdater } from "$primitives/internal";
import {
	createRadioGroup,
	type CreateRadioGroupProps,
	type RadioGroup as RadioGroupReturn
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import { removeUndefined } from "../internal/helpers";
import type { Readable } from "svelte/store";

const NAME = "RadioGroup";
const ITEM_NAME = "RadioGroupItem";

export const ctx = {
	set,
	get,
	setItem,
	getInput: () => get().elements.itemInput,
	getRadioIndicator
};

function set(props: CreateRadioGroupProps) {
	const radioGroup = createRadioGroup(removeUndefined(props));
	setContext(NAME, radioGroup);
	return {
		...radioGroup,
		updateOption: getOptionUpdater(radioGroup.options)
	};
}

function get() {
	return getContext<RadioGroupReturn>(NAME);
}

function setItem(value: string) {
	const {
		elements: { item },
		helpers: { isChecked }
	} = get();
	setContext(ITEM_NAME, { value, isChecked });
	return { item, isChecked };
}

function getRadioIndicator() {
	return getContext<{
		isChecked: Readable<(itemValue: string) => boolean>;
		value: string;
	}>(ITEM_NAME);
}
