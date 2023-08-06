import {
	type CreateSelectProps,
	type Select as SelectReturn,
	createSelect
} from "@melt-ui/svelte";

import { getContext, setContext } from "svelte";
import {
	generateId,
	getOptionUpdater,
	removeUndefined
} from "../internal/helpers";

const NAME = "Select";
const GROUP_NAME = "SelectGroup";
const ITEM_NAME = "SelectItem";

function get() {
	return getContext<SelectReturn>(NAME);
}

function set(props: CreateSelectProps) {
	const select = createSelect({
		...removeUndefined(props),
		forceVisible: true
	});
	setContext(NAME, select);
	return {
		...select,
		updateOption: getOptionUpdater(select.options)
	};
}

export const ctx = {
	set,
	get,
	setGroup,
	getContent: () => {
		const {
			elements: { menu: content },
			states: { open }
		} = get();
		return { content, open };
	},
	getTrigger: () => get().elements.trigger,
	setItem,
	getItemIndicator,
	getGroupLabel,
	getSeparator: () => get().elements.separator,
	getValue: () => get().states.valueLabel,
	getInput: () => get().elements.input
};

function setGroup() {
	const id = generateId();
	setContext(GROUP_NAME, id);
	const {
		elements: { group }
	} = get();
	return { group, id };
}

function setItem(value: unknown) {
	const {
		elements: { option: item }
	} = get();
	setContext(ITEM_NAME, value);
	return item;
}

function getGroupLabel() {
	const id = getContext<string>(GROUP_NAME);
	const {
		elements: { groupLabel }
	} = get();
	return { groupLabel, id };
}

function getItemIndicator() {
	const {
		helpers: { isSelected }
	} = get();
	const value = getContext<unknown>(ITEM_NAME);
	return {
		value,
		isSelected
	};
}
