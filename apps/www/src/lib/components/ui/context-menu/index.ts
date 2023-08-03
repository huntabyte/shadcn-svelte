import {
	melt,
	type CreateContextMenuProps as ContextMenuProps,
	type CreateContextSubmenuProps as ContextSubmenuProps,
	type ContextMenu as ContextMenuReturn,
	type CreateMenuRadioGroupProps as ContextRadioGroupProps,
	type ContextMenuRadioGroup as ContextRadioGroupReturn,
	type ContextMenuRadioItemProps as ContextRadioItemProps,
	type ContextMenuSubmenu as ContextSubmenuReturn,
	type CreateContextMenuCheckboxItemProps as ContextCheckboxItemProps,
	createContextMenu
} from "@melt-ui/svelte";
import { createEventDispatcher, getContext, setContext } from "svelte";

import Root from "./ContextMenu.svelte";
import CheckboxItem from "./ContextMenuCheckboxItem.svelte";
import Content from "./ContextMenuContent.svelte";
import Group from "./ContextMenuGroup.svelte";
import Item from "./ContextMenuItem.svelte";
import Label from "./ContextMenuLabel.svelte";
import RadioGroup from "./ContextMenuRadioGroup.svelte";
import RadioItem from "./ContextMenuRadioItem.svelte";
import Separator from "./ContextMenuSeparator.svelte";
import Shortcut from "./ContextMenuShortcut.svelte";
import Sub from "./ContextMenuSub.svelte";
import SubContent from "./ContextMenuSubContent.svelte";
import SubTrigger from "./ContextMenuSubTrigger.svelte";
import Trigger from "./ContextMenuTrigger.svelte";

const NAME = "ContextMenu";
const SUB_NAME = "ContextSubmenu";
const RADIO_GROUP_NAME = "ContextRadioGroup";

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
	dispatch: () => createEventDispatcher()
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

function getRadioItem() {
	const {
		elements: { radioItem },
		helpers: { isChecked }
	} = getContext<ContextRadioGroupReturn>(RADIO_GROUP_NAME);
	return { radioItem, isChecked };
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
	const dispatch = createEventDispatcher();
	return { item, dispatch };
}

function getCheckboxItem(props: ContextCheckboxItemProps) {
	const {
		builders: { createCheckboxItem }
	} = get();
	const {
		elements: { checkboxItem },
		states: { checked }
	} = createCheckboxItem(props);
	return { checkboxItem, isChecked: checked };
}

export {
	melt,
	type ContextMenuProps,
	type ContextSubmenuProps,
	type ContextRadioGroupProps,
	type ContextRadioItemProps,
	type ContextCheckboxItemProps
};

export const ContextMenu = Object.assign(Root, {
	CheckboxItem,
	Content,
	Group,
	Item,
	Label,
	RadioGroup,
	RadioItem,
	Separator,
	Shortcut,
	Sub,
	SubContent,
	SubTrigger,
	Trigger
});

export {
	Root as ContextMenuRoot,
	CheckboxItem as ContextMenuCheckboxItem,
	Content as ContextMenuContent,
	Group as ContextMenuGroup,
	Item as ContextMenuItem,
	Label as ContextMenuLabel,
	RadioGroup as ContextMenuRadioGroup,
	RadioItem as ContextMenuRadioItem,
	Separator as ContextMenuSeparator,
	Shortcut as ContextMenuShortcut,
	Sub as ContextMenuSub,
	SubContent as ContextMenuSubContent,
	SubTrigger as ContextMenuSubTrigger,
	Trigger as ContextMenuTrigger
};
