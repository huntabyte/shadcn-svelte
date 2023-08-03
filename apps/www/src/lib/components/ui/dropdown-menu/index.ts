import {
	createDropdownMenu,
	melt,
	type CreateDropdownMenuProps as DropdownMenuProps,
	type CreateDropdownSubmenuProps as DropdownSubmenuProps,
	type DropdownMenu as DropdownMenuReturn
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

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

export const ctx = {
	get,
	set,
	setSub,
	getTrigger: () => get().elements.trigger,
	getContent,
	getItem: () => get().elements.item
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

function getContent(sideoffset = 4) {
	const {
		elements: { menu: content },
		states: { open },
		options: { positioning }
	} = get();

	positioning.update((prev) => ({ ...prev, gutter: sideoffset }));

	return { content, open };
}

export { melt, type DropdownMenuProps, type DropdownSubmenuProps };

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
