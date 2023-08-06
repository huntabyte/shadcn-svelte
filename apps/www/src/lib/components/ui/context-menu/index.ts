import * as ContextMenuPrimitive from "$primitives/context-menu";

import Item from "./ContextMenuItem.svelte";
import Label from "./ContextMenuLabel.svelte";
import Content from "./ContextMenuContent.svelte";
import Shortcut from "./ContextMenuShortcut.svelte";
import RadioItem from "./ContextMenuRadioItem.svelte";
import Separator from "./ContextMenuSeparator.svelte";
import RadioGroup from "./ContextMenuRadioGroup.svelte";
import SubContent from "./ContextMenuSubContent.svelte";
import SubTrigger from "./ContextMenuSubTrigger.svelte";
import CheckboxItem from "./ContextMenuCheckboxItem.svelte";

const Sub = ContextMenuPrimitive.Sub;
const Root = ContextMenuPrimitive.Root;
const Trigger = ContextMenuPrimitive.Trigger;
const Group = ContextMenuPrimitive.Group;

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
