import {
	createMenubar,
	melt,
	type Menubar as MenubarReturn,
	type CreateMenubarProps as MenubarProps,
	type CreateMenubarMenuProps as MenubarMenuProps,
	type CreateMenubarSubmenuProps as MenubarSubProps,
	type CreateDropdownMenuRadioGroupProps as MenubarRadioGroupProps,
	type CreateDropdownMenuCheckboxItemProps as MenubarCheckboxItemProps,
	type MenubarMenuItemProps as MenubarItemProps,
	type MenubarMenu as MenubarMenuReturn,
	type MenubarMenuSubmenu as MenubarSubReturn,
	type MenubarMenuRadioGroup as MenubarRadioGroupReturn,
	type MenubarRadioItemProps
} from "@melt-ui/svelte";

import { createEventDispatcher, getContext, setContext } from "svelte";

import Root from "./Menubar.svelte";
import Menu from "./MenubarMenu.svelte";
import CheckboxItem from "./MenubarCheckboxItem.svelte";
import Content from "./MenubarContent.svelte";
import Group from "./MenubarGroup.svelte";
import Item from "./MenubarItem.svelte";
import Label from "./MenubarLabel.svelte";
import RadioGroup from "./MenubarRadioGroup.svelte";
import RadioItem from "./MenubarRadioItem.svelte";
import Separator from "./MenubarSeparator.svelte";
import Shortcut from "./MenubarShortcut.svelte";
import Sub from "./MenubarSub.svelte";
import SubContent from "./MenubarSubContent.svelte";
import SubTrigger from "./MenubarSubTrigger.svelte";
import Trigger from "./MenubarTrigger.svelte";

const NAME = "Menubar";
const MENU_NAME = "MenubarMenu";
const SUB_NAME = "MenubarSub";
const RADIO_GROUP_NAME = "MenubarRadioGroup";

export const ctx = {
	get,
	set,
	setMenu,
	getMenu,
	setSub,
	getTrigger: () => getMenu().elements.trigger,
	getContent,
	getItem,
	getSeparator: () => getMenu().elements.separator,
	setRadioGroup,
	getRadioItem,
	getSubTrigger,
	getSubContent,
	getCheckboxItem,
	dispatch: () => createEventDispatcher()
};

function get() {
	return getContext<MenubarReturn>(NAME);
}

function set(props: MenubarProps) {
	const menubar = createMenubar(props);
	setContext(NAME, menubar);
	return menubar.elements.menubar;
}

function getMenu() {
	return getContext<MenubarMenuReturn>(MENU_NAME);
}

function setMenu(props: MenubarMenuProps) {
	const {
		builders: { createMenu }
	} = get();

	const menu = createMenu(props);
	setContext(MENU_NAME, menu);
}

function setSub(props: MenubarSubProps) {
	const {
		builders: { createSubmenu }
	} = getMenu();
	const submenu = createSubmenu(props);
	setContext(SUB_NAME, submenu);
}

function setRadioGroup(props: MenubarRadioGroupProps) {
	const {
		builders: { createMenuRadioGroup }
	} = getMenu();
	const menuRadioGroup = createMenuRadioGroup(props);
	setContext(RADIO_GROUP_NAME, menuRadioGroup);
	const {
		elements: { radioGroup }
	} = menuRadioGroup;
	return { radioGroup };
}

function getRadioItem() {
	const {
		elements: { radioItem },
		helpers: { isChecked }
	} = getContext<MenubarRadioGroupReturn>(RADIO_GROUP_NAME);
	return { radioItem, isChecked };
}

function getSubTrigger() {
	const {
		elements: { subTrigger }
	} = getContext<MenubarSubReturn>(SUB_NAME);
	return subTrigger;
}

function getContent(sideOffset = 4) {
	const {
		elements: { menu: content },
		states: { open },
		options: { positioning }
	} = getMenu();

	positioning.update((prev) => ({ ...prev, gutter: sideOffset }));

	return { content, open };
}

function getSubContent(sideOffset = -1) {
	const {
		elements: { subMenu: subContent },
		states: { subOpen },
		options: { positioning }
	} = getContext<MenubarSubReturn>(SUB_NAME);

	positioning.update((prev) => ({ ...prev, gutter: sideOffset }));

	return { subContent, subOpen };
}

function getItem() {
	const {
		elements: { item }
	} = getMenu();
	const dispatch = createEventDispatcher();
	return { item, dispatch };
}

function getCheckboxItem(props: MenubarCheckboxItemProps) {
	const {
		builders: { createCheckboxItem }
	} = getMenu();
	const {
		elements: { checkboxItem },
		states: { checked }
	} = createCheckboxItem(props);
	return { checkboxItem, isChecked: checked };
}

export {
	melt,
	type MenubarProps,
	type MenubarMenuProps,
	type MenubarSubProps,
	type MenubarRadioGroupProps,
	type MenubarCheckboxItemProps,
	type MenubarItemProps,
	type MenubarRadioItemProps
};

export const Menubar = Object.assign(Root, {
	Menu,
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
	Root as MenubarRoot,
	Menu as MenubarMenu,
	CheckboxItem as MenubarCheckboxItem,
	Content as MenubarContent,
	Group as MenubarGroup,
	Item as MenubarItem,
	Label as MenubarLabel,
	RadioGroup as MenubarRadioGroup,
	RadioItem as MenubarRadioItem,
	Separator as MenubarSeparator,
	Shortcut as MenubarShortcut,
	Sub as MenubarSub,
	SubContent as MenubarSubContent,
	SubTrigger as MenubarSubTrigger,
	Trigger as MenubarTrigger
};
