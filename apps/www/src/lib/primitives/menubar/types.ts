import type { HTMLDivAttributes } from "$primitives/internal";
import type {
	CreateMenubarProps,
	CreateMenubarSubmenuProps,
	CreateMenubarMenuProps,
	MenubarCheckboxItemProps as CreateMenubarCheckboxItemProps,
	CreateMenuRadioGroupProps,
	MenubarRadioItemProps
} from "@melt-ui/svelte";

type Props = CreateMenubarProps & HTMLDivAttributes;
type SubProps = CreateMenubarSubmenuProps & HTMLDivAttributes;
type MenuProps = CreateMenubarMenuProps & HTMLDivAttributes;
type CheckboxItemProps = CreateMenubarCheckboxItemProps & HTMLDivAttributes;
type ContentProps = HTMLDivAttributes & {
	sideOffset?: number;
};
type GroupProps = HTMLDivAttributes;
type ItemProps = HTMLDivAttributes;
type LabelProps = HTMLDivAttributes;
type RadioGroupProps = CreateMenuRadioGroupProps & HTMLDivAttributes;
type RadioItemProps = MenubarRadioItemProps & HTMLDivAttributes;
type SeparatorProps = HTMLDivAttributes;
type SubContentProps = HTMLDivAttributes;
type SubTriggerProps = HTMLDivAttributes;

type TriggerProps = HTMLDivAttributes;

export type {
	Props,
	SubProps,
	MenuProps,
	CheckboxItemProps,
	ContentProps,
	GroupProps,
	ItemProps,
	LabelProps,
	RadioGroupProps,
	RadioItemProps,
	SeparatorProps,
	SubContentProps,
	SubTriggerProps,
	TriggerProps
};
