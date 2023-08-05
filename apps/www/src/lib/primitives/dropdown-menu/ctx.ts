import {
	type CreateContextMenuProps as ContextMenuProps,
	type CreateContextSubmenuProps as ContextSubmenuProps,
	type ContextMenu as ContextMenuReturn,
	type CreateMenuRadioGroupProps as ContextRadioGroupProps,
	type ContextMenuRadioGroup as ContextRadioGroupReturn,
	type ContextMenuSubmenu as ContextSubmenuReturn,
	type Checkbox as CheckboxReturn,
	type CreateContextMenuCheckboxItemProps as ContextCheckboxItemProps,
	createContextMenu
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import type { Readable } from "svelte/store";

const NAME = "DropdownMenu";
const SUB_NAME = "DropdownSubmenu";
const RADIO_GROUP_NAME = "DropdownRadioGroup";
const CHECKBOX_ITEM_NAME = "DropdownCheckboxItem";
const RADIO_ITEM_NAME = "DropdownRadioItem";

export const ctx = {
	get,
	set,
	setSub,
	getTrigger: () => get().elements.trigger,
	getContent,
	getItem,
	getSeparator: () => get().elements.separator,
	setRadioGroup,
	getRadioItem,
	getSubTrigger,
	getSubContent,
	getCheckboxItem,
	getCheckboxIndicator,
	getRadioIndicator
};

function get() {
	return getContext<ContextMenuReturn>(NAME);
}

function set(props: ContextMenuProps) {
	const contextMenu = createContextMenu({ ...props });
	setContext(NAME, contextMenu);
}

function setSub(props: ContextSubmenuProps) {
	const {
		builders: { createSubmenu }
	} = get();
	const dropdownSubmenu = createSubmenu(props);
	setContext(SUB_NAME, dropdownSubmenu);
}

function setRadioGroup(props: ContextRadioGroupProps) {
	const {
		builders: { createMenuRadioGroup }
	} = get();
	const contextRadioGroup = createMenuRadioGroup(props);
	setContext(RADIO_GROUP_NAME, contextRadioGroup);
	const {
		elements: { radioGroup }
	} = contextRadioGroup;
	return radioGroup;
}

function getRadioItem(value: string) {
	const {
		elements: { radioItem },
		helpers: { isChecked }
	} = getContext<ContextRadioGroupReturn>(RADIO_GROUP_NAME);
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
	} = getContext<ContextSubmenuReturn>(SUB_NAME);
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
	} = getContext<ContextSubmenuReturn>(SUB_NAME);
	positioning.update((prev) => ({ ...prev, gutter: sideOffset }));
	return { subContent, subOpen };
}

function getItem() {
	const {
		elements: { item }
	} = get();
	return { item };
}

function getCheckboxItem(props: ContextCheckboxItemProps) {
	const {
		builders: { createCheckboxItem }
	} = get();
	const {
		elements: { checkboxItem },
		states: { checked }
	} = createCheckboxItem(props);
	setContext(CHECKBOX_ITEM_NAME, checked);

	return checkboxItem;
}

function getCheckboxIndicator() {
	return getContext<CheckboxReturn["states"]["checked"]>(CHECKBOX_ITEM_NAME);
}
