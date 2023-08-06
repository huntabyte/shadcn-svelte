import * as DropdownMenuPrimitive from "$primitives/dropdown-menu";

import Item from "./DropdownMenuItem.svelte";
import Label from "./DropdownMenuLabel.svelte";
import Content from "./DropdownMenuContent.svelte";
import Shortcut from "./DropdownMenuShortcut.svelte";
import RadioItem from "./DropdownMenuRadioItem.svelte";
import Separator from "./DropdownMenuSeparator.svelte";
import RadioGroup from "./DropdownMenuRadioGroup.svelte";
import SubContent from "./DropdownMenuSubContent.svelte";
import SubTrigger from "./DropdownMenuSubTrigger.svelte";
import CheckboxItem from "./DropdownMenuCheckboxItem.svelte";

const Sub = DropdownMenuPrimitive.Sub;
const Root = DropdownMenuPrimitive.Root;
const Trigger = DropdownMenuPrimitive.Trigger;
const Group = DropdownMenuPrimitive.Group;

export {
	Sub,
	Root,
	Item,
	Label,
	Group,
	Trigger,
	Content,
	Shortcut,
	Separator,
	RadioItem,
	SubContent,
	SubTrigger,
	RadioGroup,
	CheckboxItem,
	//
	Root as ContextMenu,
	Sub as ContextMenuSub,
	Item as ContextMenuItem,
	Label as ContextMenuLabel,
	Group as ContextMenuGroup,
	Content as ContextMenuContent,
	Trigger as ContextMenuTrigger,
	Shortcut as ContextMenuShortcut,
	RadioItem as ContextMenuRadioItem,
	Separator as ContextMenuSeparator,
	RadioGroup as ContextMenuRadioGroup,
	SubContent as ContextMenuSubContent,
	SubTrigger as ContextMenuSubTrigger,
	CheckboxItem as ContextMenuCheckboxItem
};
