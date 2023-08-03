import {
	melt,
	type CreateSelectProps as SelectProps,
	type SelectOptionProps,
	type Select as SelectReturn,
	createSelect
} from "@melt-ui/svelte";

import Root from "./Select.svelte";
import Group from "./SelectGroup.svelte";
import Input from "./SelectInput.svelte";
import Label from "./SelectLabel.svelte";
import Value from "./SelectValue.svelte";
import Option from "./SelectOption.svelte";
import Content from "./SelectContent.svelte";
import Trigger from "./SelectTrigger.svelte";
import Separator from "./SelectSeparator.svelte";

import { getContext, setContext } from "svelte";

const NAME = "Select";
const GROUP_NAME = "SelectGroup";

function get() {
	return getContext<SelectReturn>(NAME);
}

function set(props: SelectProps) {
	setContext(NAME, createSelect(props));
}

export const ctx = {
	set,
	get,
	getContent: () => {
		const {
			elements: { menu: content },
			states: { open }
		} = get();
		return { content, open };
	},
	getTrigger: () => get().elements.trigger,
	getOption: () => {
		const {
			elements: { option },
			helpers: { isSelected }
		} = get();
		return { option, isSelected };
	},
	getGroup: () => {
		const key = String(Math.floor(Math.random() * 1000) + 1);
		setContext(GROUP_NAME, key);
		const {
			elements: { group }
		} = get();
		return { group, key };
	},
	getGroupLabel: () => {
		const key = getContext<string>(GROUP_NAME);
		const {
			elements: { groupLabel }
		} = get();
		return { groupLabel, key };
	},
	getSeparator: () => get().elements.separator,
	getValue: () => get().states.valueLabel,
	getInput: () => get().elements.input
};

export { melt, type SelectProps, type SelectOptionProps };

export const Select = Object.assign(Root, {
	Input,
	Value,
	Group,
	Label,
	Option,
	Content,
	Trigger,
	Separator
});

export {
	Root as SelectRoot,
	Input as SelectInput,
	Group as SelectGroup,
	Label as SelectLabel,
	Value as SelectValue,
	Option as SelectOption,
	Content as SelectContent,
	Trigger as SelectTrigger,
	Separator as SelectSeparator
};
