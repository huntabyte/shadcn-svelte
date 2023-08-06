import {
	generateId,
	getOptionUpdater,
	removeUndefined
} from "$primitives/internal";
import {
	type ContextMenu as ContextMenuReturn,
	type ContextMenuRadioGroup as ContextRadioGroupReturn,
	type ContextMenuSubmenu as ContextSubmenuReturn,
	type Checkbox as CheckboxReturn,
	type CreateContextMenuCheckboxItemProps as ContextCheckboxItemProps,
	createContextMenu,
	type CreateContextMenuProps,
	type CreateContextMenuRadioGroupProps,
	type CreateContextSubmenuProps
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import type { Readable } from "svelte/store";

const NAME = "ContextMenu";
const SUB_NAME = "ContextSubmenu";
const RADIO_GROUP_NAME = "ContextRadioGroup";
const CHECKBOX_ITEM_NAME = "ContextCheckboxItem";
const RADIO_ITEM_NAME = "ContextRadioItem";
const GROUP_NAME = "ContextGroup";

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
	setCheckboxItem,
	getCheckboxIndicator,
	getRadioIndicator,
	setGroup,
	getGroupLabel
};

function get() {
	return getContext<ContextMenuReturn>(NAME);
}

function set(props: CreateContextMenuProps) {
	const contextMenu = createContextMenu(removeUndefined(props));
	setContext(NAME, contextMenu);
	return {
		...contextMenu,
		updateOption: getOptionUpdater(contextMenu.options)
	};
}

function setSub(props: CreateContextSubmenuProps) {
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

function setRadioGroup(props: CreateContextMenuRadioGroupProps) {
	const {
		builders: { createMenuRadioGroup }
	} = get();
	const radioGroup = createMenuRadioGroup(removeUndefined(props));
	setContext(RADIO_GROUP_NAME, radioGroup);
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

function setCheckboxItem(props: ContextCheckboxItemProps) {
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
