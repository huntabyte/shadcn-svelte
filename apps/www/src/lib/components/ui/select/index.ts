import {
	melt,
	type CreateSelectProps as SelectProps,
	type SelectOptionProps,
	type Select as SelectReturn,
	createSelect
} from "@melt-ui/svelte";

import Root from "./SelectRoot.svelte";
import Content from "./SelectContent.svelte";
import Group from "./SelectGroup.svelte";
import Label from "./SelectLabel.svelte";
import Option from "./SelectOption.svelte";
import Separator from "./SelectSeparator.svelte";
import Trigger from "./SelectTrigger.svelte";
import Value from "./SelectValue.svelte";
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
	getValue: () => get().states.valueLabel
};

export { melt, type SelectProps, type SelectOptionProps };

export const Select = Object.assign(Root, {
	Content,
	Option,
	Label,
	Separator,
	Trigger,
	Value,
	Group
});

export {
	Root as SelectRoot,
	Content as SelectContent,
	Option as SelectOption,
	Group as SelectGroup,
	Label as SelectLabel,
	Separator as SelectSeparator,
	Trigger as SelectTrigger,
	Value as SelectValue
};
