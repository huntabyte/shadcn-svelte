import { Menubar as MenubarPrimitive } from "@huntabyte/primitives";

import Root from "./Menubar.svelte";
import CheckboxItem from "./MenubarCheckboxItem.svelte";
import Content from "./MenubarContent.svelte";
import Item from "./MenubarItem.svelte";
import Label from "./MenubarLabel.svelte";
import RadioItem from "./MenubarRadioItem.svelte";
import Separator from "./MenubarSeparator.svelte";
import Shortcut from "./MenubarShortcut.svelte";
import SubContent from "./MenubarSubContent.svelte";
import SubTrigger from "./MenubarSubTrigger.svelte";
import Trigger from "./MenubarTrigger.svelte";

const Menu = MenubarPrimitive.Menu;
const Group = MenubarPrimitive.Group;
const Sub = MenubarPrimitive.Sub;
const RadioGroup = MenubarPrimitive.RadioGroup;

export {
	Root,
	CheckboxItem,
	Content,
	Item,
	Label,
	RadioItem,
	Separator,
	Shortcut,
	SubContent,
	SubTrigger,
	Trigger,
	Menu,
	Group,
	Sub,
	RadioGroup,
	//
	Root as Menubar,
	CheckboxItem as MenubarCheckboxItem,
	Content as MenubarContent,
	Item as MenubarItem,
	Label as MenubarLabel,
	RadioItem as MenubarRadioItem,
	Separator as MenubarSeparator,
	Shortcut as MenubarShortcut,
	SubContent as MenubarSubContent,
	SubTrigger as MenubarSubTrigger,
	Trigger as MenubarTrigger,
	Menu as MenubarMenu,
	Group as MenubarGroup,
	Sub as MenubarSub,
	RadioGroup as MenubarRadioGroup
};
