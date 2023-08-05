import * as ContextMenuPrimitive from "$primitives/context-menu";

import CheckboxItem from "./ContextMenuCheckboxItem.svelte";
import Content from "./ContextMenuContent.svelte";
import Group from "./ContextMenuGroup.svelte";
import Item from "./ContextMenuItem.svelte";
import RadioGroup from "./ContextMenuRadioGroup.svelte";
import RadioItem from "./ContextMenuRadioItem.svelte";
import Separator from "./ContextMenuSeparator.svelte";
import Shortcut from "./ContextMenuShortcut.svelte";
import SubContent from "./ContextMenuSubContent.svelte";
import SubTrigger from "./ContextMenuSubTrigger.svelte";

const Root = ContextMenuPrimitive.Root;
const Sub = ContextMenuPrimitive.Sub;
const Trigger = ContextMenuPrimitive.Trigger;

export {
	Root,
	Sub,
	Trigger,
	CheckboxItem,
	Content,
	Group,
	Item,
	RadioGroup,
	RadioItem,
	Separator,
	Shortcut,
	SubContent,
	SubTrigger,
	//
	Root as ContextMenu,
	Sub as ContextMenuSub,
	Trigger as ContextMenuTrigger,
	CheckboxItem as ContextMenuCheckboxItem,
	Content as ContextMenuContent,
	Group as ContextMenuGroup,
	Item as ContextMenuItem,
	RadioGroup as ContextMenuRadioGroup,
	RadioItem as ContextMenuRadioItem,
	Separator as ContextMenuSeparator,
	Shortcut as ContextMenuShortcut,
	SubContent as ContextMenuSubContent,
	SubTrigger as ContextMenuSubTrigger
};
