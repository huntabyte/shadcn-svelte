import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
import Item from "./dropdown-menu-item.svelte";
import GroupLabel from "./dropdown-menu-group-label.svelte";
import Content from "./dropdown-menu-content.svelte";
import Shortcut from "./dropdown-menu-shortcut.svelte";
import RadioItem from "./dropdown-menu-radio-item.svelte";
import Separator from "./dropdown-menu-separator.svelte";
import SubContent from "./dropdown-menu-sub-content.svelte";
import SubTrigger from "./dropdown-menu-sub-trigger.svelte";
import CheckboxItem from "./dropdown-menu-checkbox-item.svelte";

const Sub = DropdownMenuPrimitive.Sub;
const Root = DropdownMenuPrimitive.Root;
const Trigger = DropdownMenuPrimitive.Trigger;
const Group = DropdownMenuPrimitive.Group;
const RadioGroup = DropdownMenuPrimitive.RadioGroup;

export {
	Sub,
	Root,
	Item,
	GroupLabel,
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
	Root as DropdownMenu,
	Sub as DropdownMenuSub,
	Item as DropdownMenuItem,
	GroupLabel as DropdownMenuGroupLabel,
	Group as DropdownMenuGroup,
	Content as DropdownMenuContent,
	Trigger as DropdownMenuTrigger,
	Shortcut as DropdownMenuShortcut,
	RadioItem as DropdownMenuRadioItem,
	Separator as DropdownMenuSeparator,
	RadioGroup as DropdownMenuRadioGroup,
	SubContent as DropdownMenuSubContent,
	SubTrigger as DropdownMenuSubTrigger,
	CheckboxItem as DropdownMenuCheckboxItem,
};
