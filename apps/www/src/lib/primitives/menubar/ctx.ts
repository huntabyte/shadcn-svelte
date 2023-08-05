import {
	createMenubar,
	type Menubar as MenubarReturn,
	type CreateMenubarProps as MenubarProps,
	type MenubarMenu as MenubarMenuReturn,
	type MenubarMenuRadioGroup as MenubarRadioGroupReturn,
	type CreateMenuRadioGroupProps as MenubarRadioGroupProps,
	type CreateMenubarSubmenuProps as MenubarSubProps,
	type CreateMenubarMenuProps as MenubarMenuProps,
	type MenubarMenuSubmenu as MenubarSubReturn,
	type MenubarCheckboxItemProps
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

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
	getCheckboxItem
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
	return { item };
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
