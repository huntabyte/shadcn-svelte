import {
	createDropdownMenu,
	melt,
	type CreateDropdownMenuProps as DropdownMenuProps,
	type CreateDropdownSubmenuProps as DropdownSubmenuProps,
	type DropdownMenu as DropdownMenuReturn,
	type CreateMenuRadioGroupProps as DropdownRadioGroupProps,
	type DropdownMenuRadioGroup as DropdownRadioGroupReturn,
	type DropdownMenuRadioItemProps as DropdownRadioItemProps,
	type DropdownMenuSubmenu as DropdownSubmenuReturn
} from "@melt-ui/svelte";
import { createEventDispatcher, getContext, setContext } from "svelte";

import Root from "./DropdownMenu.svelte";
import CheckboxItem from "./DropdownMenuCheckboxItem.svelte";
import Content from "./DropdownMenuContent.svelte";
import Group from "./DropdownMenuGroup.svelte";
import Item from "./DropdownMenuItem.svelte";
import Label from "./DropdownMenuLabel.svelte";
import RadioGroup from "./DropdownMenuRadioGroup.svelte";
import RadioItem from "./DropdownMenuRadioItem.svelte";
import Separator from "./DropdownMenuSeparator.svelte";
import Shortcut from "./DropdownMenuShortcut.svelte";
import Sub from "./DropdownMenuSub.svelte";
import SubContent from "./DropdownMenuSubContent.svelte";
import SubTrigger from "./DropdownMenuSubTrigger.svelte";
import Trigger from "./DropdownMenuTrigger.svelte";

const NAME = "DropdownMenu";
const SUB_NAME = "DropdownSubmenu";
const RADIO_GROUP_NAME = "DropdownRadioGroup";

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
	dispatch: () => createEventDispatcher()
};

function get() {
	return getContext<DropdownMenuReturn>(NAME);
}

function set(props: DropdownMenuProps) {
	const dropdownMenu = createDropdownMenu({ ...props, forceVisible: true });
	setContext(NAME, dropdownMenu);
}

function setSub(props: DropdownSubmenuProps) {
	const {
		builders: { createSubmenu }
	} = get();
	const dropdownSubmenu = createSubmenu(props);
	setContext(SUB_NAME, dropdownSubmenu);
}

function setRadioGroup(props: DropdownRadioGroupProps) {
	const {
		builders: { createMenuRadioGroup }
	} = get();
	const dropdownRadioGroup = createMenuRadioGroup(props);
	setContext(RADIO_GROUP_NAME, dropdownRadioGroup);
	const {
		elements: { radioGroup }
	} = dropdownRadioGroup;
	return { radioGroup };
}

function getRadioItem() {
	const {
		elements: { radioItem },
		helpers: { isChecked }
	} = getContext<DropdownRadioGroupReturn>(RADIO_GROUP_NAME);
	return { radioItem, isChecked };
}

function getSubTrigger() {
	const {
		elements: { subTrigger }
	} = getContext<DropdownSubmenuReturn>(SUB_NAME);
	return subTrigger;
}

function getContent(sideoffset = 4) {
	const {
		elements: { menu: content },
		states: { open },
		options: { positioning }
	} = get();

	positioning.update((prev) => ({ ...prev, gutter: sideoffset }));

	return { content, open };
}

function getSubContent() {
	const {
		elements: { subMenu: subContent },
		states: { subOpen }
	} = getContext<DropdownSubmenuReturn>(SUB_NAME);

	return { subContent, subOpen };
}

function getItem() {
	const {
		elements: { item }
	} = get();
	const dispatch = createEventDispatcher();
	return { item, dispatch };
}

export {
	melt,
	type DropdownMenuProps,
	type DropdownSubmenuProps,
	type DropdownRadioGroupProps,
	type DropdownRadioItemProps
};

export const DropdownMenu = Object.assign(Root, {
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
	Root as DropdownMenuRoot,
	CheckboxItem as DropdownMenuCheckboxItem,
	Content as DropdownMenuContent,
	Group as DropdownMenuGroup,
	Item as DropdownMenuItem,
	Label as DropdownMenuLabel,
	RadioGroup as DropdownMenuRadioGroup,
	RadioItem as DropdownMenuRadioItem,
	Separator as DropdownMenuSeparator,
	Shortcut as DropdownMenuShortcut,
	Sub as DropdownMenuSub,
	SubContent as DropdownMenuSubContent,
	SubTrigger as DropdownMenuSubTrigger,
	Trigger as DropdownMenuTrigger
};
