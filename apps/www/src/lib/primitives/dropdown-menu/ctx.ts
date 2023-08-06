import {
	generateId,
	getOptionUpdater,
	removeUndefined
} from "$primitives/internal";
import {
	type CreateDropdownSubmenuProps as DropdownSubmenuProps,
	type DropdownMenu as DropdownMenuReturn,
	type CreateMenuRadioGroupProps as DropdownRadioGroupProps,
	type DropdownMenuRadioGroup as DropdownRadioGroupReturn,
	type DropdownMenuSubmenu as DropdownSubmenuReturn,
	type Checkbox as CheckboxReturn,
	type CreateDropdownMenuCheckboxItemProps as DropdownCheckboxItemProps,
	type CreateDropdownMenuProps,
	createDropdownMenu
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import type { Readable } from "svelte/store";

const NAME = "DropdownMenu";
const SUB_NAME = "DropdownSubmenu";
const RADIO_GROUP_NAME = "DropdownRadioGroup";
const CHECKBOX_ITEM_NAME = "DropdownCheckboxItem";
const RADIO_ITEM_NAME = "DropdownRadioItem";
const GROUP_NAME = "DropdownGroup";

export const ctx = {
	get,
	set,
	setSub,
	getTrigger: () => get().elements.trigger,
	getContent,
	getItem,
	getSeparator: () => get().elements.separator,
	setRadioGroup,
	setRadioItem,
	getSubTrigger,
	getSubContent,
	setCheckboxItem,
	getCheckboxIndicator,
	getRadioIndicator,
	setGroup,
	getGroupLabel
};

function get() {
	return getContext<DropdownMenuReturn>(NAME);
}

function set(props: CreateDropdownMenuProps) {
	const dropdownMenu = createDropdownMenu(removeUndefined(props));
	setContext(NAME, dropdownMenu);
	return {
		...dropdownMenu,
		updateOption: getOptionUpdater(dropdownMenu.options)
	};
}

function setSub(props: DropdownSubmenuProps) {
	const {
		builders: { createSubmenu }
	} = get();
	const sub = createSubmenu(removeUndefined(props));
	setContext(SUB_NAME, sub);
	return {
		...sub,
		updateOption: getOptionUpdater(sub.options)
	};
}

function setRadioGroup(props: DropdownRadioGroupProps) {
	const {
		builders: { createMenuRadioGroup }
	} = get();
	const radioGroup = createMenuRadioGroup(props);
	setContext(RADIO_GROUP_NAME, radioGroup);
	return radioGroup;
}

function setRadioItem(value: string) {
	const {
		elements: { radioItem },
		helpers: { isChecked }
	} = getContext<DropdownRadioGroupReturn>(RADIO_GROUP_NAME);
	setContext(RADIO_ITEM_NAME, { isChecked, value });
	return radioItem;
}

function getRadioIndicator() {
	return getContext<{
		isChecked: Readable<(itemValue: string) => boolean>;
		value: string;
	}>(RADIO_ITEM_NAME);
}

function getSubTrigger() {
	const {
		elements: { subTrigger }
	} = getContext<DropdownSubmenuReturn>(SUB_NAME);
	return subTrigger;
}

function getContent(sideoffset = -4) {
	const {
		elements: { menu: content },
		states: { open },
		options: { positioning }
	} = get();

	positioning.update((prev) => ({ ...prev, gutter: sideoffset }));

	return { content, open };
}

function getSubContent(sideOffset = -1) {
	const {
		elements: { subMenu: subContent },
		states: { subOpen },
		options: { positioning }
	} = getContext<DropdownSubmenuReturn>(SUB_NAME);
	positioning.update((prev) => ({ ...prev, gutter: sideOffset }));
	return { subContent, subOpen };
}

function getItem() {
	const {
		elements: { item }
	} = get();
	return { item };
}

function setCheckboxItem(props: DropdownCheckboxItemProps) {
	const {
		builders: { createCheckboxItem }
	} = get();
	const checkboxItem = createCheckboxItem(removeUndefined(props));
	setContext(CHECKBOX_ITEM_NAME, checkboxItem.states.checked);

	return {
		...checkboxItem,
		updateOption: getOptionUpdater(checkboxItem.options)
	};
}

function getCheckboxIndicator() {
	return getContext<CheckboxReturn["states"]["checked"]>(CHECKBOX_ITEM_NAME);
}
function setGroup() {
	const {
		elements: { group }
	} = get();
	const id = generateId();
	setContext(GROUP_NAME, id);
	return { group, id };
}

function getGroupLabel() {
	const id = getContext<string>(GROUP_NAME);
	const {
		elements: { groupLabel }
	} = get();
	return { groupLabel, id };
}
